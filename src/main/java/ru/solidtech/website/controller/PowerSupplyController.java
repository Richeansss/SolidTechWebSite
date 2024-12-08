package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.PowerSupply;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.PowerSupplyService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/power-supply")
@AllArgsConstructor
public class PowerSupplyController {

    private static final Logger logger = LoggerFactory.getLogger(PowerSupplyController.class);
    private final PowerSupplyService powerSupplyService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllPowerSupplies() {
        List<PowerSupply> powerSupplies = powerSupplyService.findAllPowerSupplies();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список блоков питания успешно получен", powerSupplies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getPowerSupplyById(@PathVariable Long id) {
        try {
            PowerSupply powerSupply = powerSupplyService.findPowerSupplyById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Блок питания найден", powerSupply);
        } catch (IllegalArgumentException e) {
            logger.error("Блок питания не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPowerSupply(@RequestBody PowerSupply powerSupply) {
        try {
            PowerSupply createdPowerSupply = powerSupplyService.createPowerSupply(powerSupply);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Блок питания успешно создан", createdPowerSupply);
        } catch (Exception e) {
            logger.error("Ошибка при создании блока питания", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать блок питания");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updatePowerSupply(@RequestBody PowerSupply powerSupply) {
        try {
            PowerSupply updatedPowerSupply = powerSupplyService.updatePowerSupply(powerSupply);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Блок питания обновлен", updatedPowerSupply);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить блок питания с ID: {}", powerSupply.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletePowerSupply(@PathVariable Long id) {
        try {
            powerSupplyService.deletePowerSupply(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Блок питания успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить блок питания с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
