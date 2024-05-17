package ru.solidtech.website.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.GameFPSCount;

public interface GameFPSCountRepository extends JpaRepository<GameFPSCount, Long> {
    GameFPSCount save(GameFPSCount gameFPSCount);
}
