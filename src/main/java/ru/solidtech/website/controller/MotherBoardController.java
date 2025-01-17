package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.MotherBoard;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.MotherBoardService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/motherboard")
@AllArgsConstructor
public class MotherBoardController {
    private static final Logger logger = LoggerFactory.getLogger(MotherBoardController.class);
    private final MotherBoardService motherBoardService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllMotherBoards() {
        List<MotherBoard> motherBoardList = motherBoardService.findAllMotherBoards();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список материнских плат успешно получен", motherBoardList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getMotherBoardById(@PathVariable Long id) {
        try {
            MotherBoard foundMotherBoard = motherBoardService.findMotherBoardById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Материнская плата найдена", foundMotherBoard);
        } catch (IllegalArgumentException e) {
            logger.error("Материнская плата не найдена с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createMotherBoard(@RequestBody MotherBoard motherBoard) {
        try {
            MotherBoard createdMotherBoard = motherBoardService.createMotherBoard(motherBoard);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Материнская плата успешно создана", createdMotherBoard);
        } catch (Exception e) {
            logger.error("Ошибка при создании материнской платы", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать материнскую плату");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateMotherBoard(@RequestBody MotherBoard motherBoard) {
        try {
            MotherBoard updatedMotherBoard = motherBoardService.updateMotherBoard(motherBoard);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Материнская плата обновлена", updatedMotherBoard);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить материнскую плату с ID: {}", motherBoard.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteMotherBoard(@PathVariable Long id) {
        try {
            motherBoardService.deleteMotherBoard(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Материнская плата успешно удалена", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить материнскую плату с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<Map<String, Object>> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = motherBoardService.saveImage(id, file);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Изображение успешно загружено", imageUrl);
        } catch (Exception e) {
            logger.error("Ошибка при загрузке изображения для видеокарты с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось загрузить изображение");
        }
    }
}
