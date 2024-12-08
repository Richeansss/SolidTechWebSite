package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.StorageDevice;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.StorageDeviceService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/storage-devices")
@AllArgsConstructor
public class StorageDeviceController {
    private static final Logger logger = LoggerFactory.getLogger(StorageDeviceController.class);
    private final StorageDeviceService storageDeviceService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllStorageDevices() {
        List<StorageDevice> storageDevices = storageDeviceService.findAllStorageDevices();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список накопителей успешно получен", storageDevices);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getStorageDeviceById(@PathVariable Long id) {
        try {
            StorageDevice foundStorageDevice = storageDeviceService.findStorageDeviceById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Накопитель найден", foundStorageDevice);
        } catch (IllegalArgumentException e) {
            logger.error("Накопитель не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createStorageDevice(@RequestBody StorageDevice storageDevice) {
        try {
            StorageDevice createdStorageDevice = storageDeviceService.createStorageDevice(storageDevice);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Накопитель успешно создан", createdStorageDevice);
        } catch (Exception e) {
            logger.error("Ошибка при создании накопителя", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать накопитель");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateStorageDevice(@RequestBody StorageDevice storageDevice) {
        try {
            StorageDevice updatedStorageDevice = storageDeviceService.updateStorageDevice(storageDevice);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Накопитель обновлен", updatedStorageDevice);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить накопитель с ID: {}", storageDevice.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteStorageDevice(@PathVariable Long id) {
        try {
            storageDeviceService.deleteStorageDevice(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Накопитель успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить накопитель с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
