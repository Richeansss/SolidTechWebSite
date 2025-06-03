package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Case;
import ru.solidtech.website.model.Cooler;
import ru.solidtech.website.repository.CoolerRepository;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.CoolerService;
import ru.solidtech.website.service.util.ImageService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/cooler")
@AllArgsConstructor
public class CoolerController {
    private static final Logger logger = LoggerFactory.getLogger(CoolerController.class);
    private final CoolerService coolerService;
    private final CoolerRepository coolerRepository;

    @Autowired
    private ImageService imageService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllCoolers() {
        List<Cooler> coolers = coolerService.findAllCoolers();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список кулеров успешно получен", coolers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCoolerById(@PathVariable Long id) {
        try {
            Cooler cooler = coolerService.findCoolerById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Кулер найден", cooler);
        } catch (IllegalArgumentException e) {
            logger.error("Кулер не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createCooler(@RequestBody Cooler cooler) {
        try {
            Cooler createdCooler = coolerService.createCooler(cooler);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Кулер успешно создан", createdCooler);
        } catch (Exception e) {
            logger.error("Ошибка при создании кулера", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать кулер");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateCooler(@RequestBody Cooler cooler) {
        try {
            Cooler updatedCooler = coolerService.updateCooler(cooler);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Кулер обновлен", updatedCooler);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить кулер с ID: {}", cooler.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCooler(@PathVariable Long id) {
        try {
            coolerService.deleteCooler(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Кулер успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить кулер с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<Map<String, Object>> uploadImage(@PathVariable Long id, @RequestParam MultipartFile file) {
        try {
            String imageUrl = imageService.saveImage(
                    id,
                    file,
                    coolerRepository::findById,
                    Cooler::setImageUrl,
                    coolerRepository::save,
                    "cooler"
            );
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Изображение успешно загружено", imageUrl);
        } catch (IOException e) {
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось загрузить изображение");        }
    }
}

