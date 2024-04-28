package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Chipset;
import ru.solidtech.website.model.MotherBoard;
import ru.solidtech.website.model.Soket;
import ru.solidtech.website.service.BrandService;
import ru.solidtech.website.service.MotherBoardService;
import ru.solidtech.website.service.SoketService;
import ru.solidtech.website.service.ChipsetService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/motherboard")
@AllArgsConstructor
public class MotherBoardController {
    private final MotherBoardService motherBoardService;
    private final BrandService brandService;
    private final SoketService soketService;
    private final ChipsetService chipsetService;

    @GetMapping
    public List<MotherBoard> getAllMotherBoard() {
        return motherBoardService.findAllMotherBoard();
    }

    @PostMapping("save_motherboard")
    public String saveMotherBoard(@RequestBody MotherBoard motherBoard, @RequestParam("brand_id") Long brandId, @RequestParam("soket_id") Long soketId, @RequestParam("chipset_id") Long chipsetId) {
        Brand brand = brandService.findBrandById(brandId); // Получаем объект Brand по brand_id
        Soket soket = soketService.findSoketById(soketId);
        Chipset chipset = chipsetService.findChipsetById(chipsetId);
        if (brand != null && soket != null ) { // Если бренд найден
            motherBoard.setBrand(brand);// Устанавливаем бренд для материнской платы
            motherBoard.setSoket(soket);// Устанавливаем сокет для материнской платы
            motherBoard.setChipset(chipset); // Устанавливаем чипсет для материнской платы
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
