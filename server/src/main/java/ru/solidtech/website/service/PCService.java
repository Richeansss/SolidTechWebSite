package ru.solidtech.website.service;

import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.dto.PCDto;
import ru.solidtech.website.model.PC;

import java.io.IOException;
import java.util.List;

public interface PCService {
    List<PCDto> findAllPCs();

    PC findPCById(Long id);

    PC createPC(PC pc);

    PC updatePC(PC pc);

    void deletePC(Long id);

    String saveImage(Long id, MultipartFile file) throws IOException;

    List<String> saveImages(Long pcId, MultipartFile[] files) throws IOException;
}