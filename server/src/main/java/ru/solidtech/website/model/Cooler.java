package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;
import ru.solidtech.website.model.enums.FunSize;

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

    @Convert(converter = FunSize.FunSizeConverter.class)
    @Column(name = "fun_size", nullable = false)
    private FunSize funSize;

    @Column(name = "fun_connector") // Указываем имя поля в базе данных
    private Integer funConnector;

    @ManyToOne
    @JoinColumn(name = "light_type_id")
    private LightType lightType;

    @Column(name = "image_url")
    private String imageUrl;
}
