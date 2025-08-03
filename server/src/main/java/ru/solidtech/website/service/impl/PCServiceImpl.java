package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.dto.PCDto;
import ru.solidtech.website.mapper.PCMapper;
import ru.solidtech.website.model.Image;
import ru.solidtech.website.model.PC;
import ru.solidtech.website.model.PCComponent;
import ru.solidtech.website.repository.*;
import ru.solidtech.website.service.PCService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PCServiceImpl implements PCService {

    private final PCMapper pcMapper;

    private final PCComponentRepository pcComponentRepository;
    private final PCRepository pcRepository;
    private final ImageRepository imageRepository;

    public List<PCDto> findAllPCs() {
        List<PC> pcList = pcRepository.findAll();
        return pcList.stream()
                .map(pcMapper::toDto) // Используем внедренный pcMapper
                .collect(Collectors.toList());
    }

    @Override
    public PC findPCById(Long id) {
        return pcRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ПК с ID " + id + " не найден"));
    }

    @Override
    public PC createPC(PC pcEntity) {
        // Загружаем все компоненты по их ID
        pcEntity.setMotherBoard(getPCComponentById(pcEntity.getMotherBoard()));
        pcEntity.setProcessor(getPCComponentById(pcEntity.getProcessor()));
        pcEntity.setRam(getPCComponentById(pcEntity.getRam()));
        pcEntity.setCooler(getPCComponentById(pcEntity.getCooler()));
        pcEntity.setCase_pc(getPCComponentById(pcEntity.getCase_pc()));
        pcEntity.setVideocard(getPCComponentById(pcEntity.getVideocard()));
        pcEntity.setStorageDevice(getPCComponentById(pcEntity.getStorageDevice()));
        pcEntity.setPowerSupply(getPCComponentById(pcEntity.getPowerSupply()));

        return pcRepository.save(pcEntity);
    }


    private PCComponent getPCComponentById(PCComponent component) {
        if (component == null || component.getId() == null) {
            return null;
        }

        return pcComponentRepository.findById(component.getId())
                .orElseThrow(() -> new IllegalArgumentException("Компонент с ID " + component.getId() + " не найден"));
    }

    @Override
    public PC updatePC(PC pc) {
        if (!pcRepository.existsById(pc.getId())) {
            throw new IllegalArgumentException("ПК с ID " + pc.getId() + " не найден");
        }
        return pcRepository.save(pc);
    }

    @Override
    public void deletePC(Long id) {
        PC pc = pcRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ПК с ID " + id + " не найден"));

        // Удаляем файлы изображений с диска
        for (Image image : pc.getImages()) {
            Path filePath = Paths.get("src/main/resources/static/public" + image.getUrl());
            try {
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                throw new RuntimeException("Ошибка при удалении файла: " + filePath, e);
            }
        }

        // Удаляем ПК (и его изображения удалятся автоматически)
        pcRepository.delete(pc);
    }

    public List<String> saveImages(Long pcId, MultipartFile[] files) throws IOException {
        PC pc = findPCById(pcId);
        if (pc == null) {
            throw new IllegalArgumentException("Компьютер с указанным ID не найден");
        }

        List<String> imageUrls = new ArrayList<>();
        Path folderPath = Paths.get("/tmp/data/images/pc/" + pcId);
        Files.createDirectories(folderPath);

        for (MultipartFile file : files) {
            String fileName = pcId + "_" + System.currentTimeMillis() + getExtension(file);
            Path filePath = folderPath.resolve(fileName);
            Files.write(filePath, file.getBytes());

            String imageUrl = "/images/pc/" + pcId + "/" + fileName;
            imageUrls.add(imageUrl);

            // Сохраняем в БД
            Image image = new Image();
            image.setUrl(imageUrl);
            image.setPc(pc);
            imageRepository.save(image);
        }

        return imageUrls;
    }

    private String getExtension(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        if (originalFileName != null && originalFileName.contains(".")) {
            return originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        throw new IllegalArgumentException("Некорректное имя файла");
    }
}
