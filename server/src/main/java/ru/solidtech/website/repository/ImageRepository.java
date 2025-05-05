package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Image;
import ru.solidtech.website.model.Ram;

public interface ImageRepository extends JpaRepository<Image, Long> {
    // Здесь можно добавить дополнительные методы поиска, если необходимо
}
