package ru.solidtech.website.service;

import ru.solidtech.website.model.Game;

import java.util.List;

public interface GameService {
    List<Game> findAllGame();
    Game saveGame(Game game);
    Game findGameByName(String game);
    Game updateGame(Game game);
    void deleteGame(Long id);
    Game findGameById(Long id);
}
