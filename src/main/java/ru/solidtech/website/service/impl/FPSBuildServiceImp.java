package ru.solidtech.website.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.solidtech.website.model.FPSBuild;
import ru.solidtech.website.model.Game;
import ru.solidtech.website.repository.FPSBuildRepository;
import ru.solidtech.website.repository.GameRepository;
import ru.solidtech.website.service.FPSBuildService;



import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class FPSBuildServiceImp implements FPSBuildService {
    private final FPSBuildRepository repository;
    private final GameRepository gameRepository;


    @Override
    public List<FPSBuild> findAllFPSBuild() {
        return repository.findAll();
    }

    @Override
    public FPSBuild saveFPSBuild(FPSBuild fpsBuild) {
        return repository.save(fpsBuild);
    }

    @Override
    public FPSBuild findFPSBuildByName(String name) {
        return repository.findFPSBuildByName(name);
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
    public void addGameToFPSBuild(Long fpsBuildId, Long gameId) {
        FPSBuild fpsBuild = repository.findFPSBuildById(fpsBuildId);
        Game game = gameRepository.findGameById(gameId);

        if (fpsBuild != null && game != null) {
            List<Game> games = fpsBuild.getGames();
            games.add(game);
            fpsBuild.setGames(games);

            repository.save(fpsBuild);
        } else {
            throw new EntityNotFoundException("FPSBuild or Game not found");
        }
    }

}
