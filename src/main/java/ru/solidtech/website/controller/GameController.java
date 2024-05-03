package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Game;
import ru.solidtech.website.service.GameService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/game")
@AllArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping
    public List<Game> getAllGame() {
        return gameService.findAllGame();
    }

    @PostMapping("save_game")
    public String saveBrand(@RequestBody Game game) {
        gameService.saveGame(game);
        return "Game successfully saved";
    }

    @GetMapping("/{name}")
    public Game findBrandByName(@PathVariable String name) {
        return gameService.findGameByName(name);
    }

    @PutMapping("update_game")
    public Game updateGame(@RequestBody Game game) {
        return gameService.updateGame(game);
    }

    @DeleteMapping("delete_game/{id}")
    public void deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
    }
}
