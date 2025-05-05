package ru.solidtech.website.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Game;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    void deleteById(Long id);
    Optional<Game> findGameByName(String name);
    Game findGameById(Long id);
}
