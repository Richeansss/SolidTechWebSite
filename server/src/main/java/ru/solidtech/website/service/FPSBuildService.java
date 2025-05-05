package ru.solidtech.website.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solidtech.website.dto.GameFPSCountDTO;
import ru.solidtech.website.model.FPSBuild;
import ru.solidtech.website.model.Game;
import ru.solidtech.website.model.GameFPSCount;
import ru.solidtech.website.repository.FPSBuildRepository;
import ru.solidtech.website.repository.GameRepository; // Импортируйте репозиторий для получения игры

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FPSBuildService {
    private final FPSBuildRepository fpsBuildRepository;
    private final GameRepository gameRepository; // Репозиторий для доступа к играм

    // Создание нового FPSBuild с соответствующими GameFPSCount из DTO
    public FPSBuild createFPSBuild(List<GameFPSCountDTO> gameFPSCountDTOs) {
        FPSBuild fpsBuild = new FPSBuild();
        List<GameFPSCount> gameFPSCounts = new ArrayList<>();

        // Преобразование DTO в GameFPSCount
        for (GameFPSCountDTO dto : gameFPSCountDTOs) {
            Game game = gameRepository.findById(dto.getGameId())
                    .orElseThrow(() -> new IllegalArgumentException("Игра с ID " + dto.getGameId() + " не найдена"));

            GameFPSCount gameFPSCount = new GameFPSCount();
            gameFPSCount.setGame(game);
            gameFPSCount.setFpsCount(dto.getFpsCount());
            gameFPSCount.setSettings(dto.getSettings());
            gameFPSCount.setResolution(dto.getResolution());
            gameFPSCount.setTechnology(dto.getTechnology());
            gameFPSCount.setFrameGeneration(dto.isFrameGeneration());

            gameFPSCounts.add(gameFPSCount);
        }

        fpsBuild.setGameFPSCounts(gameFPSCounts);

        // Установка обратной связи
        for (GameFPSCount gameFPSCount : gameFPSCounts) {
            gameFPSCount.setFpsBuild(fpsBuild);
        }

        return fpsBuildRepository.save(fpsBuild);
    }

    // Получение FPSBuild по ID
    public FPSBuild findFPSBuildById(Long id) {
        return fpsBuildRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("FPSBuild с ID " + id + " не найден"));
    }

    // Получение всех FPSBuild
    public List<FPSBuild> findAllFPSBuilds() {
        return fpsBuildRepository.findAll();
    }

    // Обновление существующего FPSBuild
    public FPSBuild updateFPSBuild(FPSBuild fpsBuild) {
        if (!fpsBuildRepository.existsById(fpsBuild.getId())) {
            throw new IllegalArgumentException("FPSBuild с ID " + fpsBuild.getId() + " не найден");
        }
        return fpsBuildRepository.save(fpsBuild);
    }

    // Удаление FPSBuild по ID
    public void deleteFPSBuild(Long id) {
        if (!fpsBuildRepository.existsById(id)) {
            throw new IllegalArgumentException("FPSBuild с ID " + id + " не найден");
        }
        fpsBuildRepository.deleteById(id);
    }
}
