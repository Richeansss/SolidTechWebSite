package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.solidtech.website.model.enums.Certificate;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Certificate certificate;

    @Column(nullable = false)
    private Long power;

    @Column(nullable = false)
    private Boolean modular;

    @Column(name = "image_url")
    private String imageUrl;
}