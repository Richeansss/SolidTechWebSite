package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.MotherBoard;

import java.util.List;

public interface MotherBoardRepository extends JpaRepository<MotherBoard, Long> {
    void deleteById(Long id);
    MotherBoard findMotherBoardByBrandId(Long brand_id);
}