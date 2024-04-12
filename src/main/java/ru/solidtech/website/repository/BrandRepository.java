package ru.solidtech.website.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    void deleteById(Long id);
    Brand findBrandByName(String name);
}
