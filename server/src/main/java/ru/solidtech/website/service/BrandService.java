package ru.solidtech.website.service;

import ru.solidtech.website.model.Brand;

import java.util.List;

public interface BrandService {
    List<Brand> findAllBrand();
    Brand saveBrand(Brand brand);
    Brand findBrandByName(String name);
    Brand updateBrand(Brand brand);
    void deleteBrand(Long id);
    Brand findBrandById(Long id);
    List<Brand> searchBrandsByName(String name);
}
