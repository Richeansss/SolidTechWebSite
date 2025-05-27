package ru.solidtech.website.auth.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "auth_user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}