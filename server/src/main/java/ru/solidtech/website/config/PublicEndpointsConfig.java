package ru.solidtech.website.config;

import org.springframework.stereotype.Component;

@Component
public class PublicEndpointsConfig {

    public static final String[] PUBLIC_ENDPOINTS = {
            "/api/v3/auth/**",
            "/error",
            "/api/v1/pc",
            "/images/**",
    };
}
