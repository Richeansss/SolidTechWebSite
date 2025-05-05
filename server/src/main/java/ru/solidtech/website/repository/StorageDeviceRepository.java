package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.solidtech.website.model.StorageDevice;

@Repository
public interface StorageDeviceRepository extends JpaRepository<StorageDevice, Long> {
    // Если потребуется, можно добавить кастомные методы, например:
    // List<StorageDevice> findByType(StorageType type);
}
