package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.BrandService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/brand")
@AllArgsConstructor
public class BrandController {
    private static final Logger logger = LoggerFactory.getLogger(BrandController.class);
    private final BrandService brandService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllBrands() {
        List<Brand> brands = brandService.findAllBrand();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список брендов успешно получен", brands);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBrandById(@PathVariable Long id) {
        try {
            Brand foundBrand = brandService.findBrandById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Бренд найден", foundBrand);
        } catch (IllegalArgumentException e) {
            logger.error("Бренд не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createBrand(@RequestBody Brand brandEntity) {
        try {
            Brand createdBrand = brandService.saveBrand(brandEntity);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Бренд успешно создан", createdBrand);
        } catch (DataIntegrityViolationException e) {
            logger.error("Ошибка при создании бренда, возможно, имя уже существует", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.BAD_REQUEST, "Бренд с таким именем уже существует");
        } catch (Exception e) {
            logger.error("Ошибка при создании бренда", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать бренд");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateBrand(@RequestBody Brand brandEntity) {
        try {
            Brand updatedBrand = brandService.updateBrand(brandEntity);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Бренд обновлен", updatedBrand);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить бренд с ID: {}", brandEntity.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteBrand(@PathVariable Long id) {
        try {
            brandService.deleteBrand(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Бренд успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить бренд с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Новый эндпоинт для поиска брендов по имени
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchBrandsByName(@RequestParam String name) {
        List<Brand> foundBrands = brandService.searchBrandsByName(name);
        if (foundBrands.isEmpty()) {
            return ResponseBuilder.buildResponse(HttpStatus.NOT_FOUND, "Бренды не найдены", foundBrands);
        }
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Бренды найдены", foundBrands);
    }
}
