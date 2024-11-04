package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Game;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.GameService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/game")
@AllArgsConstructor
public class GameController {
    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private final GameService gameService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllGames() {
        List<Game> games = gameService.findAllGame();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Игры успешно получены", games);
    }

    @PostMapping("save_game")
    public ResponseEntity<Map<String, Object>> saveGame(@RequestBody Game game) {
        gameService.saveGame(game);
        return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Игра успешно сохранена", null);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Map<String, Object>> findGameByName(@PathVariable String name) {
        try {
            Game game = gameService.findGameByName(name);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Игра найдена", game);
        } catch (IllegalArgumentException e) {
            logger.error("Игра не найдена с именем: {}", name, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping("update_game")
    public ResponseEntity<Map<String, Object>> updateGame(@RequestBody Game game) {
        try {
            Game updatedGame = gameService.updateGame(game);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Игра обновлена", updatedGame);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить игру с ID: {}", game.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("delete_game/{id}")
    public ResponseEntity<Map<String, Object>> deleteGame(@PathVariable Long id) {
        try {
            gameService.deleteGame(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Игра успешно удалена", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить игру с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
