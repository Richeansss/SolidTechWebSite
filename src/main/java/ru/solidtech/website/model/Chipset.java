package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Chipset {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "soket_id")
    private Socket socket;
}
