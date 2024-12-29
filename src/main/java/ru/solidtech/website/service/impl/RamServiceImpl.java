package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Cooler;
import ru.solidtech.website.model.Ram;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.CoolerRepository;
import ru.solidtech.website.repository.LightTypeRepository;
import ru.solidtech.website.repository.RamRepository;
import ru.solidtech.website.service.RamService;

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
}
