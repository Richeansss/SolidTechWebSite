package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class MotherBoard {
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

    @ManyToOne
    @JoinColumn(name = "chipset_id")
    private Chipset chipset;

    @Column(name = "type_ram", nullable = false)
    @Enumerated(EnumType.STRING)
    private Ram.TypeRam typeRam;

    @Column(columnDefinition = "BIGINT NOT NULL")
    private int  pci;

    @Column(columnDefinition = "BIGINT NOT NULL")
    private int  amount_of_m2;

    @Column(name = "has_argb")
    private Boolean hasArgb;

    @Column(name = "image_url")
    private String imageUrl;

}
