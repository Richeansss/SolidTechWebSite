package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class Game {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
}