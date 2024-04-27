package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.solidtech.website.model.Soket;
import ru.solidtech.website.repository.SoketRepository;
import ru.solidtech.website.service.SoketService;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class SoketServiceImp implements SoketService {
    private final SoketRepository repository;

    @Override
    public List<Soket> findAllSoket() {
        return repository.findAll();
    }

    @Override
    public Soket saveSoket(Soket soket) {
        return repository.save(soket);
    }

    @Override
    public Soket findSoketByName(String name) {
        return repository.findSoketByName(name);
    }

    @Override
    public Soket updateSoket(Soket soket) {
        return repository.save(soket);
    }

    @Override
    @Transactional
    public void deleteSoket(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Soket findSoketById(Long id) {
        return repository.findSoketById(id);
    }

}
