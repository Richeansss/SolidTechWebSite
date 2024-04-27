package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.solidtech.website.model.MotherBoard;
import ru.solidtech.website.repository.MotherBoardRepository;
import ru.solidtech.website.service.MotherBoardService;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class MotherBoardServiceImp implements MotherBoardService {
    private final MotherBoardRepository repository;

    @Override
    public List<MotherBoard> findAllMotherBoard() {
        return repository.findAll();
    }

    @Override
    public MotherBoard saveMotherBoard(MotherBoard motherBoard) {
        return repository.save(motherBoard);
    }

    @Override
    public MotherBoard findMotherBoardByName(String name) {
        return repository.findMotherBoardByName(name);
    }

    @Override
    public MotherBoard updateMotherBoard(MotherBoard motherBoard) {
        return repository.save(motherBoard);
    }

    @Override
    @Transactional
    public void deleteMotherBoard(Long id) {
        repository.deleteById(id);
    }


}
