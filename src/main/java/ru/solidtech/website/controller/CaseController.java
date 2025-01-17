package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Case;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.CaseService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/case")
@AllArgsConstructor
public class CaseController {
    private static final Logger logger = LoggerFactory.getLogger(CaseController.class);
    private final CaseService caseService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllCases() {
        List<Case> cases = caseService.findAllCases();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список корпусов успешно получен", cases);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCaseById(@PathVariable Long id) {
        try {
            Case foundCase = caseService.findCaseById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Корпус найден", foundCase);
        } catch (IllegalArgumentException e) {
            logger.error("Корпус не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createCase(@RequestBody Case caseEntity) {
        try {
            Case createdCase = caseService.createCase(caseEntity);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Корпус успешно создан", createdCase);
        } catch (Exception e) {
            logger.error("Ошибка при создании корпуса", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать корпус");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateCase(@RequestBody Case caseEntity) {
        try {
            Case updatedCase = caseService.updateCase(caseEntity);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Корпус обновлен", updatedCase);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить корпус с ID: {}", caseEntity.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCase(@PathVariable Long id) {
        try {
            caseService.deleteCase(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Корпус успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить корпус с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<Map<String, Object>> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = caseService.saveImage(id, file);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Изображение успешно загружено", imageUrl);
        } catch (Exception e) {
            logger.error("Ошибка при загрузке изображения для видеокарты с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось загрузить изображение");
        }
    }
}
