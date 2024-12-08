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
    private Long typeRam;

    @Column(nullable = false)
    private Long jdek;

    @Column(nullable = false)
    private Long timing;

    @Column(name = "light_type", nullable = false)
    private Long lightType;
}
