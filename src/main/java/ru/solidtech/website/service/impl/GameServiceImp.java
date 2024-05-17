package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.solidtech.website.model.FPSBuild;
import ru.solidtech.website.model.Game;
import ru.solidtech.website.model.GameFPSCount;
import ru.solidtech.website.repository.GameRepository;
import ru.solidtech.website.service.GameService;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class GameServiceImp implements GameService {
    private final GameRepository repository;

    @Override
    public List<Game> findAllGame() {
        return repository.findAll();
    }

    @Override
    public Game saveGame(Game game) {
        return repository.save(game);
    }

    @Override
    public Game findGameByName(String name) {
        return repository.findGameByName(name);
    }

    @Override
    public Game updateGame(Game game) {
        return repository.save(game);
    }

    @Override
    @Transactional
    public void deleteGame(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Game findGameById(Long id) {
        return repository.findGameById(id);
    }


}
