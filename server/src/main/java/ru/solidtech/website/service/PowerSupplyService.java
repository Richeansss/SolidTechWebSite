package ru.solidtech.website.service;

import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.PowerSupply;

import java.io.IOException;
import java.util.List;

public interface PowerSupplyService {
    List<PowerSupply> findAllPowerSupplies();
    PowerSupply findPowerSupplyById(Long id);
    PowerSupply createPowerSupply(PowerSupply powerSupply);
    PowerSupply updatePowerSupply(PowerSupply powerSupply);
    void deletePowerSupply(Long id);
    String saveImage(Long id, MultipartFile file) throws IOException;
}
