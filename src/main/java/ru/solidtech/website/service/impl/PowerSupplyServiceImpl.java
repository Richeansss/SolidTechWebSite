package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.PowerSupply;
import ru.solidtech.website.model.Processor;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.PowerSupplyRepository;
import ru.solidtech.website.service.PowerSupplyService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PowerSupplyServiceImpl implements PowerSupplyService {

    private final PowerSupplyRepository powerSupplyRepository;
    private final BrandRepository brandRepository;

    @Override
    public List<PowerSupply> findAllPowerSupplies() {
        return powerSupplyRepository.findAll();
    }

    @Override
    public PowerSupply findPowerSupplyById(Long id) {
        return powerSupplyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Блок питания с ID " + id + " не найден"));
    }

    @Override
    public PowerSupply createPowerSupply(PowerSupply powerSupply) {
        Brand brand = brandRepository.findById(powerSupply.getBrand().getId())
                .orElseThrow(() -> new IllegalArgumentException("Бренд с ID " + powerSupply.getBrand().getId() + " не найден"));

        powerSupply.setBrand(brand); // Устанавливаем загруженный Brand в PowerSupply
        return powerSupplyRepository.save(powerSupply);
    }

    @Override
    public PowerSupply updatePowerSupply(PowerSupply powerSupply) {
        if (!powerSupplyRepository.existsById(powerSupply.getId())) {
            throw new IllegalArgumentException("Блок питания с ID " + powerSupply.getId() + " не найден");
        }
        return powerSupplyRepository.save(powerSupply);
    }

    @Override
    public void deletePowerSupply(Long id) {
        if (!powerSupplyRepository.existsById(id)) {
            throw new IllegalArgumentException("Блок питания с ID " + id + " не найден");
        }
        powerSupplyRepository.deleteById(id);
    }

    @Override
    public String saveImage(Long id, MultipartFile file) throws IOException {
        // Получаем видеокарту по ID
        PowerSupply powerSupply = findPowerSupplyById(id);

        if (powerSupply == null) {
            throw new IllegalArgumentException("Видеокарта с указанным ID не найдена");
        }

        // Получаем имя бренда и имя видеокарты (проверка на null и замена пробелов)
        String brandName = powerSupply.getBrand() != null && powerSupply.getBrand().getName() != null
                ? powerSupply.getBrand().getName().replaceAll("\\s+", "_")
                : "unknown_brand"; // Если бренд или его имя null, использовать "unknown_brand"
        String powerSupplyName = powerSupply.getName() != null
                ? powerSupply.getName().replaceAll("\\s+", "_")
                : "unknown_card"; // Если имя видеокарты null, использовать "unknown_card"

        // Название папки для сохранения
        Path folderPath = Paths.get("src/main/resources/static/public/images/" + powerSupplyName);

        // Создание папки, если её ещё нет
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        // Получаем оригинальное имя файла
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null || originalFileName.isEmpty()) {
            throw new IllegalArgumentException("Оригинальное имя файла отсутствует");
        }

        // Извлечение формата файла (расширения)
        String fileExtension;
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex != -1 && dotIndex < originalFileName.length() - 1) {
            fileExtension = originalFileName.substring(dotIndex);
        } else {
            throw new IllegalArgumentException("Формат файла отсутствует");
        }

        // Генерация уникального имени файла (brandName + cardName)
        String fileName = brandName + "_" + powerSupplyName + fileExtension;
        Path filePath = folderPath.resolve(fileName);

        // Сохранение файла
        Files.write(filePath, file.getBytes());

        // Сохранение ссылки на изображение в БД
        String imageUrl = "/images/power_supply/" + powerSupplyName + "/" + fileName;
        powerSupply.setImageUrl(imageUrl);
        powerSupplyRepository.save(powerSupply);

        return imageUrl;
    }
}
