package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.PowerSupply;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.PowerSupplyRepository;
import ru.solidtech.website.service.PowerSupplyService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PowerSupplyServiceImpl implements PowerSupplyService {

    private final PowerSupplyRepository powerSupplyRepository;
    private final BrandRepository brandRepository;

    @Override
    public List<PowerSupply> findAllPowerSupplies() {
        return powerSupplyRepository.findAll();
    }

    @Override
    public PowerSupply findPowerSupplyById(Long id) {
        return powerSupplyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Блок питания с ID " + id + " не найден"));
    }

    @Override
    public PowerSupply createPowerSupply(PowerSupply powerSupply) {
        Brand brand = brandRepository.findById(powerSupply.getBrand().getId())
                .orElseThrow(() -> new IllegalArgumentException("Бренд с ID " + powerSupply.getBrand().getId() + " не найден"));

        powerSupply.setBrand(brand); // Устанавливаем загруженный Brand в PowerSupply
        return powerSupplyRepository.save(powerSupply);
    }

    @Override
    public PowerSupply updatePowerSupply(PowerSupply powerSupply) {
        if (!powerSupplyRepository.existsById(powerSupply.getId())) {
            throw new IllegalArgumentException("Блок питания с ID " + powerSupply.getId() + " не найден");
        }
        return powerSupplyRepository.save(powerSupply);
    }

    @Override
    public void deletePowerSupply(Long id) {
        if (!powerSupplyRepository.existsById(id)) {
            throw new IllegalArgumentException("Блок питания с ID " + id + " не найден");
        }
        powerSupplyRepository.deleteById(id);
    }
}
