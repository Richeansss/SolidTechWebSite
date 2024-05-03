package ru.solidtech.website.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
    void deleteById(Long id);
    Game findGameByName(String name);
    Game findGameById(Long id);
}
