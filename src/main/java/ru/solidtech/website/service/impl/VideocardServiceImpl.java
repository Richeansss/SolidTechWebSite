package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Videocard;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.LightTypeRepository;
import ru.solidtech.website.repository.VideocardRepository;
import ru.solidtech.website.service.VideocardService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class VideocardServiceImpl implements VideocardService {

    private final VideocardRepository videocardRepository;
    private final BrandRepository brandRepository;
    private final LightTypeRepository lightTypeRepository;

    @Override
    public List<Videocard> findAllVideocards() {
        return videocardRepository.findAll();
    }

    @Override
    public Videocard findVideocardById(Long id) {
        return videocardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Видеокарта не найдена с ID: " + id));
    }

    @Override
    public Videocard createVideocard(Videocard videocardEntity) {
        // Загружаем и устанавливаем бренд
        videocardEntity.setBrand(getEntityById(videocardEntity.getBrand().getId(), brandRepository, "Бренд"));

        // Загружаем и устанавливаем тип освещения, если он указан
        videocardEntity.setLightType(
                (videocardEntity.getLightType() != null && videocardEntity.getLightType().getId() != null) ?
                        getEntityById(videocardEntity.getLightType().getId(), lightTypeRepository, "Тип освещения") :
                        null
        );

        return videocardRepository.save(videocardEntity); // Сохраняем Cooler
    }

    // Универсальный метод для загрузки связанных сущностей
    private <T> T getEntityById(Long id, JpaRepository<T, Long> repository, String entityName) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(entityName + " с ID " + id + " не найден"));
    }

    @Override
    public Videocard updateVideocard(Videocard videocard) {
        if (!videocardRepository.existsById(videocard.getId())) {
            throw new IllegalArgumentException("Видеокарта не найдена с ID: " + videocard.getId());
        }
        return videocardRepository.save(videocard);
    }

    @Override
    public void deleteVideocard(Long id) {
        if (!videocardRepository.existsById(id)) {
            throw new IllegalArgumentException("Видеокарта не найдена с ID: " + id);
        }
        videocardRepository.deleteById(id);
    }

    @Override
    public String saveImage(Long id, MultipartFile file) throws IOException {
        // Получаем видеокарту по ID
        Videocard videocard = findVideocardById(id);

        if (videocard == null) {
            throw new IllegalArgumentException("Видеокарта с указанным ID не найдена");
        }

        // Получаем имя бренда и имя видеокарты (проверка на null и замена пробелов)
        String brandName = videocard.getBrand() != null && videocard.getBrand().getName() != null
                ? videocard.getBrand().getName().replaceAll("\\s+", "_")
                : "unknown_brand"; // Если бренд или его имя null, использовать "unknown_brand"
        String cardName = videocard.getName() != null
                ? videocard.getName().replaceAll("\\s+", "_")
                : "unknown_card"; // Если имя видеокарты null, использовать "unknown_card"

        // Название папки для сохранения
        Path folderPath = Paths.get("images/videocards/" + cardName);

        // Создание папки, если её ещё нет
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        // Генерация уникального имени файла (brandName + cardName + оригинальное имя файла)
        String fileName = brandName + "_" + cardName;
        Path filePath = folderPath.resolve(fileName);

        // Сохранение файла
        Files.write(filePath, file.getBytes());

        // Сохранение ссылки на изображение в БД
        String imageUrl = "/images/videocards/" + cardName + "/" + fileName;
        videocard.setImageUrl(imageUrl);
        videocardRepository.save(videocard);

        return imageUrl;
    }



}
