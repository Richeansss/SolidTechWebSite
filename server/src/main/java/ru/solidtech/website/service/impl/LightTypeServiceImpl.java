package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.LightType;
import ru.solidtech.website.repository.LightTypeRepository;
import ru.solidtech.website.service.LightTypeService;

import java.util.List;

@Service
@AllArgsConstructor
public class LightTypeServiceImpl implements LightTypeService {

    private static final Logger logger = LoggerFactory.getLogger(LightTypeServiceImpl.class);
    private final LightTypeRepository lightTypeRepository;

    @Override
    public List<LightType> findAllLightTypes() {
        logger.info("Получение списка всех типов освещения");
        return lightTypeRepository.findAll();
    }

    @Override
    public LightType findLightTypeById(Long id) {
        logger.info("Поиск типа освещения по ID: {}", id);
        return lightTypeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Тип освещения не найден с ID: " + id));
    }

    @Override
    public LightType createLightType(LightType lightType) {
        logger.info("Создание нового типа освещения: {}", lightType.getName());
        return lightTypeRepository.save(lightType);
    }

    @Override
    public LightType updateLightType(LightType lightType) {
        logger.info("Обновление типа освещения с ID: {}", lightType.getId());
        if (!lightTypeRepository.existsById(lightType.getId())) {
            throw new IllegalArgumentException("Тип освещения не найден с ID: " + lightType.getId());
        }
        return lightTypeRepository.save(lightType);
    }

    @Override
    public void deleteLightType(Long id) {
        logger.info("Удаление типа освещения с ID: {}", id);
        if (!lightTypeRepository.existsById(id)) {
            throw new IllegalArgumentException("Тип освещения не найден с ID: " + id);
        }
        lightTypeRepository.deleteById(id);
    }

    @Override
    public List<LightType> searchLightTypeByName(String name) {
        return lightTypeRepository.findByNameContainingIgnoreCase(name);
    }
}
