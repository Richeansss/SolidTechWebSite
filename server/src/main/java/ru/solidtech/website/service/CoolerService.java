package ru.solidtech.website.service;

import ru.solidtech.website.model.Cooler;

import java.util.List;

public interface CoolerService {
    List<Cooler> findAllCoolers();
    Cooler findCoolerById(Long id);
    Cooler createCooler(Cooler cooler);
    Cooler updateCooler(Cooler cooler);
    void deleteCooler(Long id);
}
