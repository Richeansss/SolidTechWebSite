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

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(name = "vram", nullable = false)
    private Long vram;

    @Column(name = "type_of_vram", nullable = false)
    private Long typeOfVram;

    @Column(name = "memory_bus", nullable = false)
    private Long memoryBus;

    @Column(name = "pci", nullable = false)
    private Long pci;

    @Column(name = "color", nullable = false)
    private Long color;

    @ManyToOne
    @JoinColumn(name = "light_type_id")
    private LightType lightType;

    @Column(name = "image_url")
    private String imageUrl;
}
