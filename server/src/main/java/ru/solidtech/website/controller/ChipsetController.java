package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Chipset;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.ChipsetService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/chipset")
@AllArgsConstructor
public class ChipsetController {
    private static final Logger logger = LoggerFactory.getLogger(ChipsetController.class);
    private final ChipsetService chipsetService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllChipsets() {
        List<Chipset> chipsetList = chipsetService.findAllChipsets();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список чипсетов успешно получен", chipsetList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getChipsetById(@PathVariable Long id) {
        try {
            Chipset foundChipset = chipsetService.findChipsetById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Чипсет найден", foundChipset);
        } catch (IllegalArgumentException e) {
            logger.error("Чипсет не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createChipset(@RequestBody Chipset chipset) {
        try {
            Chipset createdChipset = chipsetService.createChipset(chipset);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Чипсет успешно создан", createdChipset);
        } catch (Exception e) {
            logger.error("Ошибка при создании чипсета", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать чипсет");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateChipset(@RequestBody Chipset chipset) {
        try {
            Chipset updatedChipset = chipsetService.updateChipset(chipset);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Чипсет обновлен", updatedChipset);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить чипсет с ID: {}", chipset.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteChipset(@PathVariable Long id) {
        try {
            chipsetService.deleteChipset(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Чипсет успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить чипсет с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
