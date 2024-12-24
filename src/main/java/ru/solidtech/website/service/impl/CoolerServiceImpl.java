package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Cooler;
import ru.solidtech.website.model.LightType;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.CoolerRepository;
import ru.solidtech.website.repository.LightTypeRepository;
import ru.solidtech.website.service.CoolerService;

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
}
