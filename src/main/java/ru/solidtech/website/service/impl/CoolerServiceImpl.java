package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Cooler;
import ru.solidtech.website.model.LightType;
import ru.solidtech.website.model.MotherBoard;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.CoolerRepository;
import ru.solidtech.website.repository.LightTypeRepository;
import ru.solidtech.website.service.CoolerService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@AllArgsConstructor
public class CoolerServiceImpl implements CoolerService {

    private final CoolerRepository coolerRepository;
    private final BrandRepository brandRepository;
    private final LightTypeRepository lightTypeRepository;

    @Override
    public List<Cooler> findAllCoolers() {
        return coolerRepository.findAll();
    }

    @Override
    public Cooler findCoolerById(Long id) {
        return coolerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Кулер с ID " + id + " не найден"));
    }

    @Override
    public Cooler createCooler(Cooler coolerEntity) {
        // Загружаем и устанавливаем бренд
        coolerEntity.setBrand(getEntityById(coolerEntity.getBrand().getId(), brandRepository, "Бренд"));

        // Загружаем и устанавливаем тип освещения, если он указан
        coolerEntity.setLightType(
                (coolerEntity.getLightType() != null && coolerEntity.getLightType().getId() != null) ?
                        getEntityById(coolerEntity.getLightType().getId(), lightTypeRepository, "Тип освещения") :
                        null
        );

        return coolerRepository.save(coolerEntity); // Сохраняем Cooler
    }

    // Универсальный метод для загрузки связанных сущностей
    private <T> T getEntityById(Long id, JpaRepository<T, Long> repository, String entityName) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(entityName + " с ID " + id + " не найден"));
    }


    @Override
    public Cooler updateCooler(Cooler cooler) {
        if (!coolerRepository.existsById(cooler.getId())) {
            throw new IllegalArgumentException("Кулер с ID " + cooler.getId() + " не найден");
        }
        return coolerRepository.save(cooler);
    }

    @Override
    public void deleteCooler(Long id) {
        if (!coolerRepository.existsById(id)) {
            throw new IllegalArgumentException("Кулер с ID " + id + " не найден");
        }
        coolerRepository.deleteById(id);
    }

    @Override
    public String saveImage(Long id, MultipartFile file) throws IOException {
        // Получаем видеокарту по ID
        Cooler cooler = findCoolerById(id);

        if (cooler == null) {
            throw new IllegalArgumentException("Видеокарта с указанным ID не найдена");
        }

        // Получаем имя бренда и имя видеокарты (проверка на null и замена пробелов)
        String brandName = cooler.getBrand() != null && cooler.getBrand().getName() != null
                ? cooler.getBrand().getName().replaceAll("\\s+", "_")
                : "unknown_brand"; // Если бренд или его имя null, использовать "unknown_brand"
        String coolerName = cooler.getName() != null
                ? cooler.getName().replaceAll("\\s+", "_")
                : "unknown_card"; // Если имя видеокарты null, использовать "unknown_card"

        // Название папки для сохранения
        Path folderPath = Paths.get("src/main/resources/static/public/images/cooler/" + coolerName);

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
        String fileName = brandName + "_" + coolerName + fileExtension;
        Path filePath = folderPath.resolve(fileName);

        // Сохранение файла
        Files.write(filePath, file.getBytes());

        // Сохранение ссылки на изображение в БД
        String imageUrl = "/images/cooler/" + coolerName + "/" + fileName;
        cooler.setImageUrl(imageUrl);
        coolerRepository.save(cooler);

        return imageUrl;
    }
}
