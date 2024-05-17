package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Processor {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL")
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "soket_id")
    private Soket soket;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL")
    private String type_of_memory;

    @Column(columnDefinition = "BIGINT NOT NULL")
    private int  core;

    @Column(columnDefinition = "BIGINT NOT NULL")
    private int threads;

    @Column(columnDefinition = "FLOAT NOT NULL")
    private float turbo_bust;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL")
    private String url;
}
