package ru.solidtech.website.service;

import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.MotherBoard;

import java.io.IOException;
import java.util.List;

public interface MotherBoardService {
    List<MotherBoard> findAllMotherBoards();
    MotherBoard findMotherBoardById(Long id);
    MotherBoard createMotherBoard(MotherBoard motherBoard);
    MotherBoard updateMotherBoard(MotherBoard motherBoard);
    void deleteMotherBoard(Long id);
    String saveImage(Long id, MultipartFile file) throws IOException;
}