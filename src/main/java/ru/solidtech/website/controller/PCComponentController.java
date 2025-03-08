package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.dto.PCComponentDTO;
import ru.solidtech.website.model.PCComponent;
import ru.solidtech.website.model.enums.ComponentType;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.PCComponentService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/pc-components")
@AllArgsConstructor
public class PCComponentController {
    private static final Logger logger = LoggerFactory.getLogger(PCComponentController.class);
    private final PCComponentService pcComponentService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllComponents() {
        List<PCComponent> components = pcComponentService.findAllComponents();
        List<PCComponentDTO> componentDTOs = components.stream()
                .map(this::convertToDTO)
                .toList();

        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список компонентов успешно получен", componentDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getComponentById(@PathVariable Long id) {
        try {
            PCComponent component = pcComponentService.findComponentById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Компонент найден", component);
        } catch (IllegalArgumentException e) {
            logger.error("Компонент не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createComponent(@RequestBody PCComponent component) {
        try {
            PCComponent createdComponent = pcComponentService.createComponent(component);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Компонент успешно создан", createdComponent);
        } catch (Exception e) {
            logger.error("Ошибка при создании компонента", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать компонент");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateComponent(@RequestBody PCComponent component) {
        try {
            PCComponent updatedComponent = pcComponentService.updateComponent(component);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Компонент обновлён", updatedComponent);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить компонент с ID: {}", component.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteComponent(@PathVariable Long id) {
        try {
            pcComponentService.deleteComponent(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Компонент успешно удалён", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить компонент с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<Map<String, Object>> getComponentDetails(@PathVariable Long id) {
        try {
            PCComponent component = pcComponentService.findComponentById(id);
            Object details = pcComponentService.getComponentDetails(component);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Детали компонента успешно получены", details);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось получить детали компонента с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }


    @GetMapping("/type/{componentType}")
    public ResponseEntity<Map<String, Object>> getComponentsByType(@PathVariable String componentType) {
        try {
            ComponentType type = ComponentType.valueOf(componentType.toUpperCase());
            List<PCComponent> components = pcComponentService.findComponentsByType(type);
            List<PCComponentDTO> componentDTOs = components.stream()
                    .map(this::convertToDTO)
                    .toList();

            return ResponseBuilder.buildResponse(HttpStatus.OK, "Список компонентов типа " + componentType + " успешно получен", componentDTOs);
        } catch (IllegalArgumentException e) {
            logger.error("Неверный тип компонента: {}", componentType, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.BAD_REQUEST, "Некорректный тип компонента: " + componentType);
        }
    }

    private PCComponentDTO convertToDTO(PCComponent component) {
        PCComponentDTO dto = new PCComponentDTO();
        dto.setId(component.getId());
        dto.setPcId(component.getPc().getId()); // Берём только ID ПК
        dto.setComponentType(component.getComponentType());
        dto.setComponentId(component.getComponentId());
        dto.setWarrantyMonths(component.getWarrantyMonths());
        dto.setStore(component.getStore());
        return dto;
    }
}
