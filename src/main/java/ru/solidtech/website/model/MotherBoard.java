package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class MotherBoard {
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
    private String chipset;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL")
    private String type_of_memory;

    @Column(columnDefinition = "BIGINT NOT NULL")
    private int  pci;

    @Column(columnDefinition = "BIGINT NOT NULL")
    private int  amount_of_m2;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL")
    private String url;
}
