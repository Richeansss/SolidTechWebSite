package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Ram;

public interface RamRepository extends JpaRepository<Ram, Long> {
    // Здесь можно добавить дополнительные методы поиска, если необходимо
}
