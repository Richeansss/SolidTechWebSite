package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Processor;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.ProcessorService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/processor")
@AllArgsConstructor
public class ProcessorController {
    private static final Logger logger = LoggerFactory.getLogger(ProcessorController.class);
    private final ProcessorService processorService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllProcessors() {
        List<Processor> processorList = processorService.findAllProcessors();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список процессоров успешно получен", processorList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProcessorById(@PathVariable Long id) {
        try {
            Processor foundProcessor = processorService.findProcessorById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Процессор найден", foundProcessor);
        } catch (IllegalArgumentException e) {
            logger.error("Процессор не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createProcessor(@RequestBody Processor processor) {
        try {
            Processor createdProcessor = processorService.createProcessor(processor);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Процессор успешно создан", createdProcessor);
        } catch (Exception e) {
            logger.error("Ошибка при создании процессора", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать процессор");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateProcessor(@RequestBody Processor processor) {
        try {
            Processor updatedProcessor = processorService.updateProcessor(processor);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Процессор обновлён", updatedProcessor);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить процессор с ID: {}", processor.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteProcessor(@PathVariable Long id) {
        try {
            processorService.deleteProcessor(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Процессор успешно удалён", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить процессор с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<Map<String, Object>> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = processorService.saveImage(id, file);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Изображение успешно загружено", imageUrl);
        } catch (Exception e) {
            logger.error("Ошибка при загрузке изображения для видеокарты с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось загрузить изображение");
        }
    }
}
