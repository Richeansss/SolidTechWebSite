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
    private final PCService servicePC;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllPC() {
        List<PC> pcs = servicePC.findAllPC();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список PC успешно получен", pcs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getPCById(@PathVariable Long id) {
        try {
            PC pc = servicePC.findPCById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "PC найден", pc);
        } catch (IllegalArgumentException e) {
            logger.error("PC не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPC(@RequestBody PC pc) {
        try {
            PC createdPC = servicePC.createPC(pc);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "PC успешно создан", createdPC);
        } catch (Exception e) {
            logger.error("Ошибка при создании PC", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать PC");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updatePC(@RequestBody PC pc) {
        try {
            PC updatedPC = servicePC.updatePC(pc);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "PC обновлен", updatedPC);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить PC с ID: {}", pc.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletePC(@PathVariable Long id) {
        try {
            servicePC.deletePC(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "PC успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить PC с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
