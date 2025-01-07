package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.PC;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.PCService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/pc")
@AllArgsConstructor
public class PCController {
    private static final Logger logger = LoggerFactory.getLogger(PCController.class);
    private final PCService pcService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllPCs() {
        List<PC> pcList = pcService.findAllPCs();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список ПК успешно получен", pcList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getPCById(@PathVariable Long id) {
        try {
            PC foundPC = pcService.findPCById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "ПК найден", foundPC);
        } catch (IllegalArgumentException e) {
            logger.error("ПК не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPC(@RequestBody PC pc) {
        try {
            PC createdPC = pcService.createPC(pc);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "ПК успешно создан", createdPC);
        } catch (Exception e) {
            logger.error("Ошибка при создании ПК", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать ПК");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updatePC(@RequestBody PC pc) {
        try {
            PC updatedPC = pcService.updatePC(pc);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "ПК обновлён", updatedPC);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить ПК с ID: {}", pc.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletePC(@PathVariable Long id) {
        try {
            pcService.deletePC(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "ПК успешно удалён", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить ПК с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
