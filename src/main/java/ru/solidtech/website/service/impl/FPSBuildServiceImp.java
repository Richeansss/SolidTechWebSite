package ru.solidtech.website.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.solidtech.website.model.FPSBuild;
import ru.solidtech.website.model.Game;
import ru.solidtech.website.model.GameFPSCount;
import ru.solidtech.website.repository.FPSBuildRepository;
import ru.solidtech.website.repository.GameFPSCountRepository;
import ru.solidtech.website.repository.GameRepository;
import ru.solidtech.website.service.FPSBuildService;
import ru.solidtech.website.dto.GameFPSCountRequestDTO;



import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class FPSBuildServiceImp implements FPSBuildService {
    private final FPSBuildRepository repository;
    private final GameRepository gameRepository;
    private final GameFPSCountRepository gameFPSCountRepository;


    @Override
    public List<FPSBuild> findAllFPSBuild() {
        return repository.findAll();
    }

    @Override
    public FPSBuild saveFPSBuild(FPSBuild fpsBuild) {
        return repository.save(fpsBuild);
    }


    @Override
    public FPSBuild updateFPSBuild(FPSBuild fpsBuild) {
        return repository.save(fpsBuild);
    }

    @Override
    @Transactional
    public void deleteFPSBuild(Long id) {
        repository.deleteById(id);
    }

    @Override
    public FPSBuild findFPSBuildById(Long id) {
        return repository.findFPSBuildById(id);
    }

    @Override
    public GameFPSCount addGameToGameFPSCountsById(Long fpsBuildId, Long gameId, int fpsCount) {
        // Получение FPSBuild из базы данных по его идентификатору
        FPSBuild fpsBuild = repository.findById(fpsBuildId)
                .orElseThrow(() -> new EntityNotFoundException("FPSBuild not found with id: " + fpsBuildId));

        // Получение Game из базы данных по его идентификатору
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with id: " + gameId));

        // Создание новой записи GameFPSCount
        GameFPSCount gameFPSCount = new GameFPSCount();
        gameFPSCount.setFpsCount(fpsCount);
        gameFPSCount.setGame(game);
        gameFPSCount.setFpsBuild(fpsBuild);

        // Сохранение записи GameFPSCount в базу данных
        return gameFPSCountRepository.save(gameFPSCount);
    }

}
