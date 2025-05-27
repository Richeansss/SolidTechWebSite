package ru.solidtech.website.auth.controller;

import lombok.AllArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.solidtech.website.auth.JwtUtil;
import ru.solidtech.website.auth.model.AuthenticationRequest;
import ru.solidtech.website.auth.model.AuthenticationResponse;
import ru.solidtech.website.auth.model.User;
import ru.solidtech.website.auth.service.UserService;
import ru.solidtech.website.response.CustomResponse;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v3/auth")
@AllArgsConstructor
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<CustomResponse<AuthenticationResponse>> createAuthenticationToken(
            @RequestBody AuthenticationRequest authenticationRequest) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            logger.error("Ошибка аутентификации для пользователя: {}", authenticationRequest.getUsername(), e);
            return ResponseEntity.status(401).body(
                    new CustomResponse<>(401, "Неверное имя пользователя или пароль", null)
            );
        }

        final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        final String jwt = jwtUtil.generateToken(userDetails.getUsername(), roles);

        AuthenticationResponse response = new AuthenticationResponse(jwt);
        return ResponseEntity.ok(new CustomResponse<>(200, "Аутентификация прошла успешно", response));
    }

    @PostMapping("/register")
    public ResponseEntity<CustomResponse<String>> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok(
                    new CustomResponse<>(200, "Пользователь успешно зарегистрирован", null)
            );
        } catch (IllegalArgumentException e) {
            logger.error("Ошибка регистрации пользователя: {}", user.getUsername(), e);
            return ResponseEntity.badRequest().body(
                    new CustomResponse<>(400, e.getMessage(), null)
            );
        }
    }
}
