package ru.solidtech.website.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class GameFPSCount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "fpsbuild_id")
    @JsonBackReference
    private FPSBuild fpsBuild;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    private int fpsCount;

    // Дополнительные поля
    private String settings;         // Настройки игры (например, "Высокие", "Средние")
    private String resolution;       // Разрешение (например, "1920x1080")
    private String technology;       // Технология (например, "DLSS", "FSR")
    private boolean frameGeneration; // Генерация кадров (true/false)
}