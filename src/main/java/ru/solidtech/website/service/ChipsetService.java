package ru.solidtech.website.service;

import ru.solidtech.website.model.Chipset;

import java.util.List;

public interface ChipsetService {
    List<Chipset> findAllChipset();
    Chipset saveChipset(Chipset chipset);
    Chipset findChipsetByName(String chipset);
    Chipset updateChipset(Chipset chipset);
    void deleteChipset(Long id);
    Chipset findChipsetById(Long id);
}
