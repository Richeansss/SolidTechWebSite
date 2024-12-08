package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Ram;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.RamService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ram")
@AllArgsConstructor
public class RamController {
    private static final Logger logger = LoggerFactory.getLogger(RamController.class);
    private final RamService ramService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllRam() {
        List<Ram> ramList = ramService.findAllRam();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список оперативной памяти успешно получен", ramList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getRamById(@PathVariable Long id) {
        try {
            Ram foundRam = ramService.findRamById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Оперативная память найдена", foundRam);
        } catch (IllegalArgumentException e) {
            logger.error("Оперативная память не найдена с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createRam(@RequestBody Ram ram) {
        try {
            Ram createdRam = ramService.createRam(ram);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Оперативная память успешно создана", createdRam);
        } catch (Exception e) {
            logger.error("Ошибка при создании оперативной памяти", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать оперативную память");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateRam(@RequestBody Ram ram) {
        try {
            Ram updatedRam = ramService.updateRam(ram);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Оперативная память обновлена", updatedRam);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить оперативную память с ID: {}", ram.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteRam(@PathVariable Long id) {
        try {
            ramService.deleteRam(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Оперативная память успешно удалена", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить оперативную память с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
