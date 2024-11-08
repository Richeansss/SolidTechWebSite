package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Cooler;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.CoolerRepository;
import ru.solidtech.website.service.CoolerService;

import java.util.List;

@Service
@AllArgsConstructor
public class CoolerServiceImpl implements CoolerService {

    private final CoolerRepository coolerRepository;
    private final BrandRepository brandRepository;

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
    public Cooler createCooler(Cooler cooler) {
        // Загружаем полный объект Brand перед сохранением Cooler
        Brand brand = brandRepository.findById(cooler.getBrand().getId())
                .orElseThrow(() -> new IllegalArgumentException("Бренд с ID " + cooler.getBrand().getId() + " не найден"));

        cooler.setBrand(brand); // Устанавливаем загруженный Brand в Cooler
        return coolerRepository.save(cooler);
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
