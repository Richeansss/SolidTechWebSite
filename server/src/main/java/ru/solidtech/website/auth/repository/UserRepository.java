package ru.solidtech.website.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.auth.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}