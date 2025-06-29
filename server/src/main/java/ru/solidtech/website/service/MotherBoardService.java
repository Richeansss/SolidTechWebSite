package ru.solidtech.website.service;

import ru.solidtech.website.model.MotherBoard;

import java.util.List;

public interface MotherBoardService {
    List<MotherBoard> findAllMotherBoards();
    MotherBoard findMotherBoardById(Long id);
    MotherBoard createMotherBoard(MotherBoard motherBoard);
    MotherBoard updateMotherBoard(MotherBoard motherBoard);
    void deleteMotherBoard(Long id);
}