package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.MotherBoard;
import ru.solidtech.website.model.Soket;
import ru.solidtech.website.service.BrandService;
import ru.solidtech.website.service.MotherBoardService;
import ru.solidtech.website.service.SoketService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/motherboard")
@AllArgsConstructor
public class MotherBoardController {
    private final MotherBoardService motherBoardService;
    private final BrandService brandService;
    private final SoketService soketService;

    @GetMapping
    public List<MotherBoard> getAllMotherBoard() {
        return motherBoardService.findAllMotherBoard();
    }

    @PostMapping("save_motherboard")
    public String saveMotherBoard(@RequestBody MotherBoard motherBoard, @RequestParam("brand_id") Long brandId, @RequestParam("soket_id") Long soketId) {
        Brand brand = brandService.findBrandById(brandId); // Получаем объект Brand по brand_id
        Soket soket = soketService.findSoketById(soketId);
        if (brand != null && soket != null ) { // Если бренд найден
            motherBoard.setBrand(brand);// Устанавливаем бренд для материнской платы
            motherBoard.setSoket(soket);
            motherBoardService.saveMotherBoard(motherBoard); // Сохраняем материнскую плату
            return "Motherboard successfully saved";
        } else { // Если бренд не найден
            return "Brand not found for the given brand_id";
        }
    }

    @GetMapping("/{name}")
    public MotherBoard findMotherBoardByName(@PathVariable String name) {
        return motherBoardService.findMotherBoardByName(name);
    }

    @PutMapping("update_motherboard")
    public MotherBoard updateMotherBoard(@RequestBody MotherBoard motherBoard) {
        return motherBoardService.updateMotherBoard(motherBoard);
    }

    @DeleteMapping("delete_motherboard/{id}")
    public void deleteMotherBoard(@PathVariable Long id) {
        motherBoardService.deleteMotherBoard(id);
    }
}
