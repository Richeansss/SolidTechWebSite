package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Ram;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.RamRepository;
import ru.solidtech.website.service.RamService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RamServiceImpl implements RamService {
    private final RamRepository ramRepository;
    private final BrandRepository brandRepository;

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
    public Ram createRam(Ram ram) {
        Brand brand = brandRepository.findById(ram.getBrand().getId())
                .orElseThrow(() -> new IllegalArgumentException("Бренд с ID " + ram.getBrand().getId() + " не найден"));

        ram.setBrand(brand); // Устанавливаем загруженный Brand в Cooler
        return ramRepository.save(ram);
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
