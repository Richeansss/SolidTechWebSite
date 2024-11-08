package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.PC;
import ru.solidtech.website.repository.PCRepository;
import ru.solidtech.website.service.PCService;

import java.util.List;

@Service
@AllArgsConstructor
public class PCServiceImpl implements PCService {

    private final PCRepository pcRepository;

    @Override
    public List<PC> findAllPC() {
        return pcRepository.findAll();
    }

    @Override
    public PC findPCById(Long id) {
        return pcRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("PC с ID " + id + " не найден"));
    }

    @Override
    public PC createPC(PC pc) {
        return pcRepository.save(pc);
    }

    @Override
    public PC updatePC(PC pc) {
        if (!pcRepository.existsById(pc.getId())) {
            throw new IllegalArgumentException("PC с ID " + pc.getId() + " не найден для обновления");
        }
        return pcRepository.save(pc);
    }

    @Override
    public void deletePC(Long id) {
        if (!pcRepository.existsById(id)) {
            throw new IllegalArgumentException("PC с ID " + id + " не найден для удаления");
        }
        pcRepository.deleteById(id);
    }
}
