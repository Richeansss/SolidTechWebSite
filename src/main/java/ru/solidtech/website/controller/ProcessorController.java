package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Processor;
import ru.solidtech.website.model.Soket;
import ru.solidtech.website.service.BrandService;
import ru.solidtech.website.service.ProcessorService;
import ru.solidtech.website.service.SoketService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/processor")
@AllArgsConstructor
public class ProcessorController {
    private final ProcessorService processorService;
    private final BrandService brandService;
    private final SoketService soketService;

    @GetMapping
    public List<Processor> getAllProcessor() {
        return processorService.findAllProcessor();
    }

    @PostMapping("save_processor")
    public String saveProcessor(@RequestBody Processor processor, @RequestParam("brand_id") Long brandId, @RequestParam("soket_id") Long soketId) {
        if (processor != null) {
            Brand brand = brandService.findBrandById(brandId); // Получаем объект Brand по brand_id
            Soket soket = soketService.findSoketById(soketId);
            if (brand != null && soket != null) { // Если бренд найден
                processor.setBrand(brand);// Устанавливаем бренд для процессора
                processor.setSoket(soket);// Устанавливаем сокет для процессора
                processorService.saveProcessor(processor); // Сохраняем процессор
                return "Processor successfully saved";
            } else { // Если бренд не найден
                return "Brand not found for the given brand_id";
            }
        } else { // Если процессор равен null
            return "Processor object is null";
        }
    }


    @GetMapping("/{name}")
    public Processor findProcessorByName(@PathVariable String name) {
        return processorService.findProcessorByName(name);
    }

    @PutMapping("update_processor")
    public Processor updateProcessor(@RequestBody Processor processor) {
        return processorService.updateProcessor(processor);
    }

    @DeleteMapping("delete_processor/{id}")
    public void deleteProcessor(@PathVariable Long id) {
        processorService.deleteProcessor(id);
    }
}
