package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.FPSBuild;
import ru.solidtech.website.model.Game;
import ru.solidtech.website.repository.FPSBuildRepository;
import ru.solidtech.website.repository.GameRepository;
import ru.solidtech.website.service.FPSBuildService;
import ru.solidtech.website.service.GameService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/fpsBuild")
@AllArgsConstructor
public class FPSBuildController {

    private final FPSBuildService fpsBuildService;
    private final GameService gameService;

    @GetMapping
    public List<FPSBuild> getAllFPSBuild() {
        return fpsBuildService.findAllFPSBuild();
    }

    @PostMapping("/{fpsBuildId}/addGame/{gameId}")
    public String addGameToFPSBuild(@PathVariable Long fpsBuildId, @PathVariable Long gameId) {
        fpsBuildService.addGameToFPSBuild(fpsBuildId, gameId);
        return "Game successfully added to FPSBuild";
    }

    @PostMapping("save_fpsBuild")
    public String saveBrand(@RequestBody FPSBuild fpsBuild) {
        fpsBuildService.saveFPSBuild(fpsBuild);
        return "FPSBuild successfully saved";
    }

    @GetMapping("/{name}")
    public FPSBuild findBrandByName(@PathVariable String name) {
        return fpsBuildService.findFPSBuildByName(name);
    }

    @PutMapping("update_fpsBuild")
    public FPSBuild updateFPSBuild(@RequestBody FPSBuild fpsBuild) {
        return fpsBuildService.updateFPSBuild(fpsBuild);
    }

    @DeleteMapping("delete_fpsBuild/{id}")
    public void deleteFPSBuild(@PathVariable Long id) {
        fpsBuildService.deleteFPSBuild(id);
    }
}
