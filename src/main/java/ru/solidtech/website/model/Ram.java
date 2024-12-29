package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ram")
@Getter
@Setter
public class Ram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(name = "amount_ram", nullable = false)
    private Long amountRam;

    @Column(name = "type_ram", nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeRam typeRam;

    @Column(nullable = false)
    private Long jdek;

    @Column(nullable = false)
    private Long timing;

    @ManyToOne
    @JoinColumn(name = "light_type_id")
    private LightType lightType;

    public enum TypeRam {

        DDR,

        DDR2,

        DDR3,

        DDR4,

        DDR5,

        LPDDR,

        GDDR,

        HBM
    }
}
