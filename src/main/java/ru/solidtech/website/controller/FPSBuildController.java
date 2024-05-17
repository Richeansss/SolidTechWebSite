package ru.solidtech.website.controller;

import error.ErrorResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.FPSBuild;
import ru.solidtech.website.model.GameFPSCount;
import ru.solidtech.website.service.FPSBuildService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/fpsBuild")
@AllArgsConstructor
public class FPSBuildController {

    private final FPSBuildService fpsBuildService;

    @GetMapping
    public List<FPSBuild> getAllFPSBuild() {
        return fpsBuildService.findAllFPSBuild();
    }


    @PostMapping("/{fpsBuildId}/games/{gameId}")
    public ResponseEntity<?> addGameToGameFPSCountsById(@PathVariable Long fpsBuildId, @PathVariable Long gameId, @RequestParam int fpsCount) {
        try {
            GameFPSCount gameFPSCount = fpsBuildService.addGameToGameFPSCountsById(fpsBuildId, gameId, fpsCount);
            return ResponseEntity.ok(gameFPSCount);
        } catch (EntityNotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse("Entity Not Found", e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Internal Server Error", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("save_fpsBuild")
    public String saveFPSBuild(@RequestBody FPSBuild fpsBuild) {
        fpsBuildService.saveFPSBuild(fpsBuild);
        return "FPSBuild successfully saved";
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
