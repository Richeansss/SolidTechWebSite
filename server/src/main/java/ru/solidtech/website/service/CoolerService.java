package ru.solidtech.website.service;

import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Cooler;

import java.io.IOException;
import java.util.List;

public interface CoolerService {
    List<Cooler> findAllCoolers();
    Cooler findCoolerById(Long id);
    Cooler createCooler(Cooler cooler);
    Cooler updateCooler(Cooler cooler);
    void deleteCooler(Long id);
    String saveImage(Long id, MultipartFile file) throws IOException;
}
