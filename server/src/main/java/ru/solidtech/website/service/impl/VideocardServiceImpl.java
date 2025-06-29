package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Videocard;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.LightTypeRepository;
import ru.solidtech.website.repository.VideocardRepository;
import ru.solidtech.website.service.VideocardService;

import java.util.List;

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
}
