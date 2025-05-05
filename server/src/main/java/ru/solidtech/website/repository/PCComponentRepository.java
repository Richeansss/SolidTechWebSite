package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.PCComponent;
import ru.solidtech.website.model.enums.ComponentType;

import java.util.List;

public interface PCComponentRepository extends JpaRepository<PCComponent, Long> {
    List<PCComponent> findByComponentType(ComponentType componentType);

}
