package ru.solidtech.website.service;

import ru.solidtech.website.model.PowerSupply;

import java.util.List;

public interface PowerSupplyService {
    List<PowerSupply> findAllPowerSupplies();
    PowerSupply findPowerSupplyById(Long id);
    PowerSupply createPowerSupply(PowerSupply powerSupply);
    PowerSupply updatePowerSupply(PowerSupply powerSupply);
    void deletePowerSupply(Long id);
}
