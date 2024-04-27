package ru.solidtech.website.service;

import ru.solidtech.website.model.MotherBoard;

import java.util.List;

public interface MotherBoardService {
    List<MotherBoard> findAllMotherBoard();
    MotherBoard saveMotherBoard(MotherBoard motherBoard);
    MotherBoard findMotherBoardByName(String name);
    MotherBoard updateMotherBoard(MotherBoard motherBoard);
    void deleteMotherBoard(Long id);
}
