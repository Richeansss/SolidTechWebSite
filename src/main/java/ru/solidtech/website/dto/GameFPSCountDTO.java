package ru.solidtech.website.dto;

import lombok.Data;

@Data
public class GameFPSCountDTO {
    private Long gameId;
    private int fpsCount;
    private String settings;
    private String resolution;
    private String technology;
    private boolean frameGeneration;
}
