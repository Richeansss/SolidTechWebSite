package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.PC;
import ru.solidtech.website.repository.PCRepository;
import ru.solidtech.website.service.PCService;

import java.util.List;

@Service
@AllArgsConstructor
public class PCServiceImp implements PCService {
    private final PCRepository pcRepository;

    @Override
    public List<PC> findAllPC() {
        return List.of();
    }


}
