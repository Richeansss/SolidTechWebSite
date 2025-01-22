package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Processor {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL")
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "soket_id")
    private Socket socket;

    @Column(name = "type_ram", nullable = false)
    @Enumerated(EnumType.STRING)
    private Ram.TypeRam typeRam;

    @Column(columnDefinition = "BIGINT NOT NULL")
    private int  core;

    @Column(columnDefinition = "BIGINT NOT NULL")
    private int threads;

    @Column(columnDefinition = "FLOAT NOT NULL")
    private float turbo_bust;

    @Column(name = "image_url")
    private String imageUrl;
}
