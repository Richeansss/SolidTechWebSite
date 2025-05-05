package ru.solidtech.website.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "videocard")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Videocard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(name = "graphics_clock")
    private String graphicsClock;

    @Column(name = "boost_clock")
    private String boostClock;

    @Column(name = "vram", nullable = false)
    private Long vram;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_vram", nullable = false)
    private TypeOfVram typeOfVram;

    @Column(name = "memory_bus", nullable = false)
    private Long memoryBus;

    @Column(name = "pci", nullable = false)
    private Long pci;

    @Enumerated(EnumType.STRING)
    @Column(name = "color", nullable = false)
    private Color color;

    @ManyToOne
    @JoinColumn(name = "light_type_id")
    private LightType lightType;

    @Column(name = "image_url")
    private String imageUrl;




    public enum TypeOfVram {
        GDDR1,
        GDDR2,
        GDDR3,
        GDDR4,
        GDDR5,
        GDDR5X,
        GDDR6,
        GDDR6X,
        GDDR7,
        GDDR7X,
        LPDDR4,
        LPDDR5,
        LPDDR5X,
    }

    public enum Color {
        BLACK,
        WHITE,
        RED,
        BLUE,
        GREEN,
        YELLOW,
        ORANGE,
        PURPLE,
        PINK,
        GRAY,
        SILVER,
        GOLD
    }
}
