package ru.solidtech.website.service;

import ru.solidtech.website.model.FPSBuild;
import ru.solidtech.website.model.GameFPSCount;

import java.util.List;

public interface FPSBuildService {
    List<FPSBuild> findAllFPSBuild();
    FPSBuild saveFPSBuild(FPSBuild fpsBuild);
    FPSBuild updateFPSBuild(FPSBuild fpsBuild);
    void deleteFPSBuild(Long id);
    FPSBuild findFPSBuildById(Long id);
    GameFPSCount addGameToGameFPSCountsById(Long fpsBuildId, Long gameId, int fpsCount);
}


