package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.service.BrandService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/brand")
@AllArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @GetMapping
    public List<Brand> getAllBrands() {
        return brandService.findAllBrand();
    }

    @PostMapping("save_brand")
    public String saveBrand(@RequestBody Brand brand) {
        brandService.saveBrand(brand);
        return "Brand successfully saved";
    }

    @GetMapping("/{name}")
    public Brand findBrandByName(@PathVariable String name) {
        return brandService.findBrandByName(name);
    }

    @PutMapping("update_brand")
    public Brand updateBrand(@RequestBody Brand brand) {
        return brandService.updateBrand(brand);
    }

    @DeleteMapping("delete_brand/{id}")
    public void deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
    }
}
