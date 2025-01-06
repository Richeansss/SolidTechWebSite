package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Chipset;
import ru.solidtech.website.repository.ChipsetRepository;
import ru.solidtech.website.service.ChipsetService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChipsetServiceImpl implements ChipsetService {

    private final ChipsetRepository chipsetRepository;

    @Override
    public List<Chipset> findAllChipsets() {
        return chipsetRepository.findAll();
    }

    @Override
    public Chipset findChipsetById(Long id) {
        return chipsetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Chipset с ID " + id + " не найден"));
    }

    @Override
    public Chipset createChipset(Chipset chipsetEntity) {
        return chipsetRepository.save(chipsetEntity); // Сохраняем Chipset
    }

    @Override
    public Chipset updateChipset(Chipset chipset) {
        if (!chipsetRepository.existsById(chipset.getId())) {
            throw new IllegalArgumentException("Chipset с ID " + chipset.getId() + " не найден");
        }
        return chipsetRepository.save(chipset);
    }

    @Override
    public void deleteChipset(Long id) {
        if (!chipsetRepository.existsById(id)) {
            throw new IllegalArgumentException("Chipset с ID " + id + " не найден");
        }
        chipsetRepository.deleteById(id);
    }
}
