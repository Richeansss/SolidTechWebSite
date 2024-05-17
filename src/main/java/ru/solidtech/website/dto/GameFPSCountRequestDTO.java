package ru.solidtech.website.dto;

import lombok.Data;

@Data
public class GameFPSCountRequestDTO {
    private Long fpsBuildId; // Идентификатор FPSBuild, в который добавляется игра
    private Long gameId; // Идентификатор игры, которую добавляют
    private int fpsCount; // Количество FPS для указанной игры в FPSBuild
}
