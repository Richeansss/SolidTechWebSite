package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "case_pc")
public class Case {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(name = "form_factor", nullable = false)
    private Long formFactor;

    @Column(name = "amount_fun", nullable = false)
    private Long amountFun;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @ManyToOne
    @JoinColumn(name = "light_type_id")
    private LightType lightType;

    @Column(name = "fun_connector")
    private Long funConnector;

    @Column(name = "color", nullable = false)
    private Long color;

    @Column(name = "glass_type", nullable = false)
    private Long glassType;

    @Column(name = "image_url")
    private String imageUrl;
}
