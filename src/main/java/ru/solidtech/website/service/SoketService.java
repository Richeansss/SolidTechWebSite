package ru.solidtech.website.service;

import ru.solidtech.website.model.Soket;

import java.util.List;

public interface SoketService {
    List<Soket> findAllSoket();
    Soket saveSoket(Soket soket);
    Soket findSoketByName(String soket);
    Soket updateSoket(Soket soket);
    void deleteSoket(Long id);
    Soket findSoketById(Long id);
}
