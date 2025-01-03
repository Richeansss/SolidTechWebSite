package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Case;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.CaseRepository;
import ru.solidtech.website.repository.LightTypeRepository;
import ru.solidtech.website.service.CaseService;

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
}
