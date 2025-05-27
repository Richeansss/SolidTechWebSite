package ru.solidtech.website.auth.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "auth_role")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}