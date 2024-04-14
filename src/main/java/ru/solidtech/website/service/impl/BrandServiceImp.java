package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.service.BrandService;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class BrandServiceImp implements BrandService {
    private final BrandRepository repository;

    @Override
    public List<Brand> findAllBrand() {
        return repository.findAll();
    }

    @Override
    public Brand saveBrand(Brand brand) {
        return repository.save(brand);
    }

    @Override
    public Brand findBrandByName(String name) {
        return repository.findBrandByName(name);
    }

    @Override
    public Brand updateBrand(Brand brand) {
        return repository.save(brand);
    }

    @Override
    @Transactional
    public void deleteBrand(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Brand findBrandById(Long id) {
        return repository.findBrandById(id);
    }

}
