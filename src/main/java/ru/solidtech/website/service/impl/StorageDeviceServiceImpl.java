package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Ram;
import ru.solidtech.website.model.StorageDevice;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.StorageDeviceRepository;
import ru.solidtech.website.service.StorageDeviceService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StorageDeviceServiceImpl implements StorageDeviceService {
    private final StorageDeviceRepository storageDeviceRepository;
    private final BrandRepository brandRepository;

    @Override
    public List<StorageDevice> findAllStorageDevices() {
        return storageDeviceRepository.findAll();
    }

    @Override
    public StorageDevice findStorageDeviceById(Long id) {
        return storageDeviceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Накопитель с ID " + id + " не найден"));
    }

    @Override
    public StorageDevice createStorageDevice(StorageDevice storageDevice) {
        Brand brand = brandRepository.findById(storageDevice.getBrand().getId())
                .orElseThrow(() -> new IllegalArgumentException("Бренд с ID " + storageDevice.getBrand().getId() + " не найден"));

        storageDevice.setBrand(brand); // Устанавливаем загруженный Brand в StorageDevice
        return storageDeviceRepository.save(storageDevice);
    }

    @Override
    public StorageDevice updateStorageDevice(StorageDevice storageDevice) {
        if (!storageDeviceRepository.existsById(storageDevice.getId())) {
            throw new IllegalArgumentException("Накопитель с ID " + storageDevice.getId() + " не найден");
        }

        Brand brand = brandRepository.findById(storageDevice.getBrand().getId())
                .orElseThrow(() -> new IllegalArgumentException("Бренд с ID " + storageDevice.getBrand().getId() + " не найден"));

        storageDevice.setBrand(brand); // Устанавливаем загруженный Brand в StorageDevice
        return storageDeviceRepository.save(storageDevice);
    }

    @Override
    public void deleteStorageDevice(Long id) {
        if (!storageDeviceRepository.existsById(id)) {
            throw new IllegalArgumentException("Накопитель с ID " + id + " не найден");
        }
        storageDeviceRepository.deleteById(id);
    }

    @Override
    public String saveImage(Long id, MultipartFile file) throws IOException {
        // Получаем видеокарту по ID
        StorageDevice storageDevice = findStorageDeviceById(id);

        if (storageDevice == null) {
            throw new IllegalArgumentException("Видеокарта с указанным ID не найдена");
        }

        // Получаем имя бренда и имя видеокарты (проверка на null и замена пробелов)
        String brandName = storageDevice.getBrand() != null && storageDevice.getBrand().getName() != null
                ? storageDevice.getBrand().getName().replaceAll("\\s+", "_")
                : "unknown_brand"; // Если бренд или его имя null, использовать "unknown_brand"
        String storageDeviceName = storageDevice.getName() != null
                ? storageDevice.getName().replaceAll("\\s+", "_")
                : "unknown_card"; // Если имя видеокарты null, использовать "unknown_card"

        // Название папки для сохранения
        Path folderPath = Paths.get("src/main/resources/static/public/images/" + storageDeviceName);

        // Создание папки, если её ещё нет
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        // Получаем оригинальное имя файла
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null || originalFileName.isEmpty()) {
            throw new IllegalArgumentException("Оригинальное имя файла отсутствует");
        }

        // Извлечение формата файла (расширения)
        String fileExtension;
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex != -1 && dotIndex < originalFileName.length() - 1) {
            fileExtension = originalFileName.substring(dotIndex);
        } else {
            throw new IllegalArgumentException("Формат файла отсутствует");
        }

        // Генерация уникального имени файла (brandName + cardName)
        String fileName = brandName + "_" + storageDeviceName + fileExtension;
        Path filePath = folderPath.resolve(fileName);

        // Сохранение файла
        Files.write(filePath, file.getBytes());

        // Сохранение ссылки на изображение в БД
        String imageUrl = "/images/storage_device/" + storageDeviceName + "/" + fileName;
        storageDevice.setImageUrl(imageUrl);
        storageDeviceRepository.save(storageDevice);

        return imageUrl;
    }
}
