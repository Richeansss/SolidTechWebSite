package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Case;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.CaseRepository;
import ru.solidtech.website.service.CaseService;

import java.util.List;

@Service
@AllArgsConstructor
public class CaseServiceImpl implements CaseService {

    private static final Logger logger = LoggerFactory.getLogger(CaseServiceImpl.class);
    private final CaseRepository caseRepository;
    private final BrandRepository brandRepository;


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
        Brand brand = brandRepository.findById(caseEntity.getBrand().getId())
                .orElseThrow(() -> new IllegalArgumentException("Бренд с ID " + caseEntity.getBrand().getId() + " не найден"));

        caseEntity.setBrand(brand); // Устанавливаем загруженный Brand в Cooler
        return caseRepository.save(caseEntity);
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
