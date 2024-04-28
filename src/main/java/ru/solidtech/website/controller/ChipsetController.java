package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Chipset;
import ru.solidtech.website.service.ChipsetService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/chipset")
@AllArgsConstructor
public class ChipsetController {
    private final ChipsetService chipsetService;

    @GetMapping
    public List<Chipset> getAllChipsets() {
        return chipsetService.findAllChipset();
    }

    @PostMapping("save_chipset")
    public String saveChipset(@RequestBody Chipset chipset) {
        chipsetService.saveChipset(chipset);
        return "Chipset successfully saved";
    }

    @GetMapping("/{name}")
    public Chipset findChipsetByName(@PathVariable String name) {
        return chipsetService.findChipsetByName(name);
    }

    @PutMapping("update_chipset")
    public Chipset updateChipset(@RequestBody Chipset chipset) {
        return chipsetService.updateChipset(chipset);
    }

    @DeleteMapping("delete_chipset/{id}")
    public void deleteChipset(@PathVariable Long id) {
        chipsetService.deleteChipset(id);
    }
}
