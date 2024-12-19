package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.LightType;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.LightTypeService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/light-type")
@AllArgsConstructor
public class LightTypeController {
    private static final Logger logger = LoggerFactory.getLogger(LightTypeController.class);
    private final LightTypeService lightTypeService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllLightTypes() {
        List<LightType> lightTypes = lightTypeService.findAllLightTypes();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список типов освещения успешно получен", lightTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getLightTypeById(@PathVariable Long id) {
        try {
            LightType foundLightType = lightTypeService.findLightTypeById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Тип освещения найден", foundLightType);
        } catch (IllegalArgumentException e) {
            logger.error("Тип освещения не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createLightType(@RequestBody LightType lightType) {
        try {
            LightType createdLightType = lightTypeService.createLightType(lightType);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Тип освещения успешно создан", createdLightType);
        } catch (Exception e) {
            logger.error("Ошибка при создании типа освещения", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать тип освещения");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateLightType(@RequestBody LightType lightType) {
        try {
            LightType updatedLightType = lightTypeService.updateLightType(lightType);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Тип освещения обновлен", updatedLightType);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить тип освещения с ID: {}", lightType.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteLightType(@PathVariable Long id) {
        try {
            lightTypeService.deleteLightType(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Тип освещения успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить тип освещения с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
