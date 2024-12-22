package ru.solidtech.website.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Brand;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    void deleteById(Long id);
    Brand findBrandByName(String name);
    Brand findBrandById(Long id);
    List<Brand> findByNameContainingIgnoreCase(String name);
}
