package ru.solidtech.website.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ru.solidtech.website.auth.JwtRequestFilter;

import java.util.List;

/**
 * Конфигурация безопасности для приложения.
 * Настраивает JWT, авторизацию и роли доступа.
 */
@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    /**
     * Кодировщик паролей (используется BCrypt).
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Пути, доступные всем (в том числе неавторизованным)
    private static final String[] PUBLIC_ENDPOINTS = {
            "/api/v3/auth/*",
            "/error",
            "/images/**"
    };

    // Доступ только ADMIN и MODERATOR
    private static final String[] ADMIN_MODERATOR_ENDPOINTS = {
            "/api/v1/brand",
    };

    // Доступ ADMIN, MODERATOR, USER
    private static final String[] AUTHENTICATED_ENDPOINTS = {
            "/api/v1/workers", "/api/v1/tasks", "/api/v1/task-workers",
            "/api/v2/tasks", "/api/v2/task-workers", "/api/v2/workers", "/api/v2/analyze-dir",
            "/api/v2/sovof-svod", "/api/v2/incident/", "/api/v2/asset-groups",
            "/api/v3/km", "/api/v3/stage", "/api/v3/lpu", "api/v3/tracing-work",
            "api/v3/km/", "api/v3/organization", "api/v3/faksogramma-work", "api/v3/faksogramma-stage"
    };



    /**
     * Менеджер аутентификации (интеграция с JWT).
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("*")); // Для разработки можно "*", для прода - конкретные домены
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization")); // Важно для JWT
        config.setAllowCredentials(false); // Если не используете куки

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    /**
     * Главная настройка безопасности.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/api/v1/pc").permitAll()
                        .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                        .requestMatchers(ADMIN_MODERATOR_ENDPOINTS).hasAnyRole("ADMIN", "MODERATOR")
                        .requestMatchers(AUTHENTICATED_ENDPOINTS).hasAnyRole("ADMIN", "MODERATOR", "USER")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Без сессий, т.к. JWT
                )
                .exceptionHandling(handling -> handling
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            log.error("Access denied for path: {}", request.getRequestURI());
                            response.sendError(403, "Access Denied");
                        })
                        .authenticationEntryPoint((request, response, authException) -> {
                            log.error("Unauthorized for path: {}", request.getRequestURI());
                            response.sendError(401, "Unauthorized");
                        })
                );

        // JWT фильтр перед UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
