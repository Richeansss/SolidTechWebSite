package ru.solidtech.website.service;

import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.StorageDevice;

import java.io.IOException;
import java.util.List;

public interface StorageDeviceService {
    /**
     * Получить список всех накопителей.
     *
     * @return список накопителей
     */
    List<StorageDevice> findAllStorageDevices();

    /**
     * Найти накопитель по ID.
     *
     * @param id идентификатор накопителя
     * @return найденный накопитель
     * @throws IllegalArgumentException если накопитель не найден
     */
    StorageDevice findStorageDeviceById(Long id);

    /**
     * Создать новый накопитель.
     *
     * @param storageDevice объект накопителя для создания
     * @return созданный накопитель
     * @throws IllegalArgumentException если связанный бренд не найден
     */
    StorageDevice createStorageDevice(StorageDevice storageDevice);

    /**
     * Обновить существующий накопитель.
     *
     * @param storageDevice объект накопителя с обновленными данными
     * @return обновленный накопитель
     * @throws IllegalArgumentException если накопитель или бренд не найден
     */
    StorageDevice updateStorageDevice(StorageDevice storageDevice);

    /**
     * Удалить накопитель по ID.
     *
     * @param id идентификатор накопителя
     * @throws IllegalArgumentException если накопитель не найден
     */
    void deleteStorageDevice(Long id);

    String saveImage(Long id, MultipartFile file) throws IOException;
}
