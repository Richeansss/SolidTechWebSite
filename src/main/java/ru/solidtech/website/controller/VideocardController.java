package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Videocard;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.VideocardService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/videocard")
@AllArgsConstructor
public class VideocardController {
    private static final Logger logger = LoggerFactory.getLogger(VideocardController.class);
    private final VideocardService videocardService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllVideocards() {
        List<Videocard> videocards = videocardService.findAllVideocards();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список видеокарт успешно получен", videocards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getVideocardById(@PathVariable Long id) {
        try {
            Videocard videocard = videocardService.findVideocardById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Видеокарта найдена", videocard);
        } catch (IllegalArgumentException e) {
            logger.error("Видеокарта не найдена с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createVideocard(@RequestBody Videocard videocard) {
        try {
            Videocard createdVideocard = videocardService.createVideocard(videocard);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Видеокарта успешно создана", createdVideocard);
        } catch (Exception e) {
            logger.error("Ошибка при создании видеокарты", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать видеокарту");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateVideocard(@RequestBody Videocard videocard) {
        try {
            Videocard updatedVideocard = videocardService.updateVideocard(videocard);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Видеокарта обновлена", updatedVideocard);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить видеокарту с ID: {}", videocard.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteVideocard(@PathVariable Long id) {
        try {
            videocardService.deleteVideocard(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Видеокарта успешно удалена", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить видеокарту с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
