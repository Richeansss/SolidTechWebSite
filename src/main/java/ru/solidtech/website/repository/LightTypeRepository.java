package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.LightType;

import java.util.List;

public interface LightTypeRepository extends JpaRepository<LightType, Long> {
    List<LightType> findByNameContainingIgnoreCase(String name);
}
