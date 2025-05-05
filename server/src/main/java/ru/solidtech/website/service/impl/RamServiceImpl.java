package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Processor;
import ru.solidtech.website.model.Ram;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.LightTypeRepository;
import ru.solidtech.website.repository.RamRepository;
import ru.solidtech.website.service.RamService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RamServiceImpl implements RamService {
    private final RamRepository ramRepository;
    private final BrandRepository brandRepository;
    private final LightTypeRepository lightTypeRepository;

    @Override
    public List<Ram> findAllRam() {
        return ramRepository.findAll();
    }

    @Override
    public Ram findRamById(Long id) {
        return ramRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("RAM с ID " + id + " не найден"));
    }

    @Override
    public Ram createRam(Ram ramEntity) {
        // Загружаем и устанавливаем бренд
        ramEntity.setBrand(getEntityById(ramEntity.getBrand().getId(), brandRepository, "Бренд"));

        // Загружаем и устанавливаем тип освещения, если он указан
        ramEntity.setLightType(
                (ramEntity.getLightType() != null && ramEntity.getLightType().getId() != null) ?
                        getEntityById(ramEntity.getLightType().getId(), lightTypeRepository, "Тип освещения") :
                        null
        );

        return ramRepository.save(ramEntity); // Сохраняем Cooler
    }

    // Универсальный метод для загрузки связанных сущностей
    private <T> T getEntityById(Long id, JpaRepository<T, Long> repository, String entityName) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(entityName + " с ID " + id + " не найден"));
    }

    @Override
    public Ram updateRam(Ram ram) {
        if (!ramRepository.existsById(ram.getId())) {
            throw new IllegalArgumentException("RAM с ID " + ram.getId() + " не найден");
        }
        return ramRepository.save(ram);
    }

    @Override
    public void deleteRam(Long id) {
        if (!ramRepository.existsById(id)) {
            throw new IllegalArgumentException("RAM с ID " + id + " не найден");
        }
        ramRepository.deleteById(id);
    }

    @Override
    public String saveImage(Long id, MultipartFile file) throws IOException {
        // Получаем видеокарту по ID
        Ram ram = findRamById(id);

        if (ram == null) {
            throw new IllegalArgumentException("Видеокарта с указанным ID не найдена");
        }

        // Получаем имя бренда и имя видеокарты (проверка на null и замена пробелов)
        String brandName = ram.getBrand() != null && ram.getBrand().getName() != null
                ? ram.getBrand().getName().replaceAll("\\s+", "_")
                : "unknown_brand"; // Если бренд или его имя null, использовать "unknown_brand"
        String ramName = ram.getName() != null
                ? ram.getName().replaceAll("\\s+", "_")
                : "unknown_card"; // Если имя видеокарты null, использовать "unknown_card"

        // Название папки для сохранения
        Path folderPath = Paths.get("src/main/resources/static/public/images/ram/" + ramName);

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
        String fileName = brandName + "_" + ramName + fileExtension;
        Path filePath = folderPath.resolve(fileName);

        // Сохранение файла
        Files.write(filePath, file.getBytes());

        // Сохранение ссылки на изображение в БД
        String imageUrl = "/images/ram/" + ramName + "/" + fileName;
        ram.setImageUrl(imageUrl);
        ramRepository.save(ram);

        return imageUrl;
    }
}
