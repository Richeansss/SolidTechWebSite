package ru.solidtech.website.model;

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
    private FPSBuild fpsBuild;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    private int fpsCount;
}