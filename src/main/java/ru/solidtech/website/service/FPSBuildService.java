package ru.solidtech.website.service;

import ru.solidtech.website.model.FPSBuild;

import java.util.List;

public interface FPSBuildService {
    List<FPSBuild> findAllFPSBuild();
    FPSBuild saveFPSBuild(FPSBuild fpsBuild);
    FPSBuild findFPSBuildByName(String fpsBuild);
    FPSBuild updateFPSBuild(FPSBuild fpsBuild);
    void deleteFPSBuild(Long id);
    FPSBuild findFPSBuildById(Long id);
    void addGameToFPSBuild(Long fpsBuildId, Long gameId);
}
