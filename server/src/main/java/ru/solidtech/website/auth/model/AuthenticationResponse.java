package ru.solidtech.website.auth.model;


import lombok.Data;

@Data
public class AuthenticationResponse {
    private final String jwt;
}
