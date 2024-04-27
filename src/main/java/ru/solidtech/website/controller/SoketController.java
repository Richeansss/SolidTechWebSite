package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Soket;
import ru.solidtech.website.service.SoketService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/soket")
@AllArgsConstructor
public class SoketController {
    private final SoketService soketService;

    @GetMapping
    public List<Soket> getAllSoket() {
        return soketService.findAllSoket();
    }

    @PostMapping("save_soket")
    public String saveBrand(@RequestBody Soket soket) {
        soketService.saveSoket(soket);
        return "Soket successfully saved";
    }

    @GetMapping("/{name}")
    public Soket findBrandByName(@PathVariable String name) {
        return soketService.findSoketByName(name);
    }

    @PutMapping("update_soket")
    public Soket updateSoket(@RequestBody Soket soket) {
        return soketService.updateSoket(soket);
    }

    @DeleteMapping("delete_soket/{id}")
    public void deleteSoket(@PathVariable Long id) {
        soketService.deleteSoket(id);
    }
}
