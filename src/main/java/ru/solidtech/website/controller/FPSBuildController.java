package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.dto.GameFPSCountDTO;
import ru.solidtech.website.model.FPSBuild;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.FPSBuildService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/fpsbuild")
@AllArgsConstructor
public class FPSBuildController {
    private static final Logger logger = LoggerFactory.getLogger(FPSBuildController.class);
    private final FPSBuildService fpsBuildService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createFPSBuild(@RequestBody List<GameFPSCountDTO> gameFPSCountDTOs) { // Изменено на DTO
        try {
            FPSBuild fpsBuild = fpsBuildService.createFPSBuild(gameFPSCountDTOs); // Передаем DTO в сервис
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "FPSBuild успешно создан", fpsBuild);
        } catch (Exception e) {
            logger.error("Ошибка при создании FPSBuild", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать FPSBuild");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getFPSBuildById(@PathVariable Long id) {
        try {
            FPSBuild fpsBuild = fpsBuildService.findFPSBuildById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "FPSBuild найден", fpsBuild);
        } catch (IllegalArgumentException e) {
            logger.error("FPSBuild не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllFPSBuilds() {
        List<FPSBuild> fpsBuilds = fpsBuildService.findAllFPSBuilds();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "FPSBuilds успешно получены", fpsBuilds);
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateFPSBuild(@RequestBody FPSBuild fpsBuild) {
        try {
            FPSBuild updatedFPSBuild = fpsBuildService.updateFPSBuild(fpsBuild);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "FPSBuild обновлен", updatedFPSBuild);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить FPSBuild с ID: {}", fpsBuild.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteFPSBuild(@PathVariable Long id) {
        try {
            fpsBuildService.deleteFPSBuild(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "FPSBuild успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить FPSBuild с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
