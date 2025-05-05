package ru.solidtech.website.service;

import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Ram;

import java.io.IOException;
import java.util.List;

public interface RamService {
    List<Ram> findAllRam();

    Ram findRamById(Long id);

    Ram createRam(Ram ram);

    Ram updateRam(Ram ram);

    void deleteRam(Long id);

    String saveImage(Long id, MultipartFile file) throws IOException;
}
