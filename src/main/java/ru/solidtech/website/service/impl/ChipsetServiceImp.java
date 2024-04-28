package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.solidtech.website.model.Chipset;
import ru.solidtech.website.repository.ChipsetRepository;
import ru.solidtech.website.service.ChipsetService;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class ChipsetServiceImp implements ChipsetService {
    private final ChipsetRepository repository;

    @Override
    public List<Chipset> findAllChipset() {
        return repository.findAll();
    }

    @Override
    public Chipset saveChipset(Chipset chipset) {
        return repository.save(chipset);
    }

    @Override
    public Chipset findChipsetByName(String name) {
        return repository.findChipsetByName(name);
    }

    @Override
    public Chipset updateChipset(Chipset chipset) {
        return repository.save(chipset);
    }

    @Override
    @Transactional
    public void deleteChipset(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Chipset findChipsetById(Long id) {
        return repository.findChipsetById(id);
    }
}
