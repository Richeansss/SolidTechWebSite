package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.StorageDevice;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.StorageDeviceRepository;
import ru.solidtech.website.service.StorageDeviceService;

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
}
