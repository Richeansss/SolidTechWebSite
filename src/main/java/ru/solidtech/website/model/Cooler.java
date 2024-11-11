package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Cooler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    private Integer tdp;
    private Integer fun_connector;
    private Long lightType;
}
