package ru.solidtech.website.auth.service;

import org.springframework.security.core.userdetails.UserDetails;
import ru.solidtech.website.auth.model.User;

public interface UserService {
    void registerUser(User user);
    UserDetails loadUserByUsername(String username);
}