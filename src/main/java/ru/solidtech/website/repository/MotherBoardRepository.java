package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.MotherBoard;


public interface MotherBoardRepository extends JpaRepository<MotherBoard, Long> {
    void deleteById(Long id);
    MotherBoard findMotherBoardByBrandId(Long brand_id);

    MotherBoard findMotherBoardByName(String name);
}