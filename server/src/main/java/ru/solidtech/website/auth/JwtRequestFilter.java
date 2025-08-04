package ru.solidtech.website.auth;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.solidtech.website.config.PublicEndpointsConfig;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
    private static final AntPathMatcher pathMatcher = new AntPathMatcher();
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public JwtRequestFilter(JwtUtil jwtUtil,
                            UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain chain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        // Пропускаем публичные эндпоинты без проверки JWT
        if (isPublicEndpoint(requestURI)) {
            chain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");

        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            final String jwtToken = authHeader.substring(7);

            try {
                String username = jwtUtil.extractUsername(jwtToken);

                if (StringUtils.hasText(username)
                        && SecurityContextHolder.getContext().getAuthentication() == null
                        && jwtUtil.validateToken(jwtToken)) {

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    List<String> roles = jwtUtil.extractRoles(jwtToken);

                    Collection<SimpleGrantedAuthority> authorities = roles.stream()
                            .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                            .collect(Collectors.toList());

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    logger.info("User '{}' authenticated successfully", username);
                }
            } catch (Exception ex) {
                logger.error("JWT token processing error", ex);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return;
            }
        } else {
            logger.warn("JWT token is missing for protected endpoint: {}", requestURI);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header required");
            return;
        }

        chain.doFilter(request, response);
    }

    private boolean isPublicEndpoint(String requestURI) {
        for (String endpoint : PublicEndpointsConfig.PUBLIC_ENDPOINTS) {
            if (pathMatcher.match(endpoint, requestURI)) {
                return true;
            }
        }
        return false;
    }
}