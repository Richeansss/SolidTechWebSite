package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Case;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.CaseRepository;
import ru.solidtech.website.repository.LightTypeRepository;
import ru.solidtech.website.service.CaseService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@AllArgsConstructor
public class CaseServiceImpl implements CaseService {

    private static final Logger logger = LoggerFactory.getLogger(CaseServiceImpl.class);
    private final CaseRepository caseRepository;
    private final BrandRepository brandRepository;
    private final LightTypeRepository lightTypeRepository;


    @Override
    public List<Case> findAllCases() {
        return caseRepository.findAll();
    }

    @Override
    public Case findCaseById(Long id) {
        return caseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Корпус не найден с ID: " + id));
    }

    @Override
    public Case createCase(Case caseEntity) {
        // Загружаем и устанавливаем бренд
        caseEntity.setBrand(getEntityById(caseEntity.getBrand().getId(), brandRepository, "Бренд"));

        // Загружаем и устанавливаем тип освещения, если он указан
        if (caseEntity.getLightType() != null && caseEntity.getLightType().getId() != null) {
            caseEntity.setLightType(getEntityById(caseEntity.getLightType().getId(), lightTypeRepository, "Тип освещения"));
        }

        return caseRepository.save(caseEntity); // Сохраняем Case
    }

    // Универсальный метод для загрузки связанных сущностей
    private <T> T getEntityById(Long id, JpaRepository<T, Long> repository, String entityName) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(entityName + " с ID " + id + " не найден"));
    }

    @Override
    public Case updateCase(Case caseEntity) {
        if (!caseRepository.existsById(caseEntity.getId())) {
            throw new IllegalArgumentException("Корпус не найден с ID: " + caseEntity.getId());
        }
        return caseRepository.save(caseEntity);
    }

    @Override
    public void deleteCase(Long id) {
        if (!caseRepository.existsById(id)) {
            throw new IllegalArgumentException("Корпус не найден с ID: " + id);
        }
        caseRepository.deleteById(id);
    }

    @Override
    public String saveImage(Long id, MultipartFile file) throws IOException {
        // Получаем видеокарту по ID
        Case casePc = findCaseById(id);

        if (casePc == null) {
            throw new IllegalArgumentException("Видеокарта с указанным ID не найдена");
        }

        // Получаем имя бренда и имя видеокарты (проверка на null и замена пробелов)
        String brandName = casePc.getBrand() != null && casePc.getBrand().getName() != null
                ? casePc.getBrand().getName().replaceAll("\\s+", "_")
                : "unknown_brand"; // Если бренд или его имя null, использовать "unknown_brand"
        String casePcName = casePc.getName() != null
                ? casePc.getName().replaceAll("\\s+", "_")
                : "unknown_card"; // Если имя видеокарты null, использовать "unknown_card"

        // Название папки для сохранения
        Path folderPath = Paths.get("src/main/resources/static/public/images/" + casePcName);

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
        String fileName = brandName + "_" + casePcName + fileExtension;
        Path filePath = folderPath.resolve(fileName);

        // Сохранение файла
        Files.write(filePath, file.getBytes());

        // Сохранение ссылки на изображение в БД
        String imageUrl = "/images/case_pc/" + casePcName + "/" + fileName;
        casePc.setImageUrl(imageUrl);
        caseRepository.save(casePc);

        return imageUrl;
    }
}
