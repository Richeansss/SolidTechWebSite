package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "power_supply")
@Getter
@Setter
@NoArgsConstructor
public class PowerSupply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(nullable = false)
    private Long certificate;

    @Column(nullable = false)
    private Long power;

    @Column(nullable = false)
    private Boolean modular;
}