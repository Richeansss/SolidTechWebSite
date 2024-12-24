package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.solidtech.website.model.Game;
import ru.solidtech.website.repository.GameRepository;
import ru.solidtech.website.service.GameService;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class GameServiceImp implements GameService {
    private static final Logger logger = LoggerFactory.getLogger(GameServiceImp.class);
    private final GameRepository repository;

    @Override
    public List<Game> findAllGame() {
        logger.info("Fetching all games");
        return repository.findAll();
    }

    @Override
    public Game saveGame(Game game) {
        logger.info("Saving new game: {}", game.getName());
        return repository.save(game);
    }

    @Override
    public Game findGameByName(String name) {
        logger.info("Searching for game by name: {}", name);
        return repository.findGameByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Game not found with name: " + name));
    }

    @Override
    @Transactional
    public Game updateGame(Game game) {
        logger.info("Updating game with ID: {}", game.getId());
        if (!repository.existsById(game.getId())) {
            throw new IllegalArgumentException("Game not found with ID: " + game.getId());
        }
        return repository.save(game);
    }

    @Override
    @Transactional
    public void deleteGame(Long id) {
        logger.info("Deleting game with ID: {}", id);
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Game not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    @Override
    public Game findGameById(Long id) {
        logger.info("Searching for game by ID: {}", id);
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Game not found with ID: " + id));
    }
}
