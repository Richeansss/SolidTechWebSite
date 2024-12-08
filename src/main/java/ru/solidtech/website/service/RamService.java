package ru.solidtech.website.service;

import ru.solidtech.website.model.Ram;

import java.util.List;

public interface RamService {
    List<Ram> findAllRam();

    Ram findRamById(Long id);

    Ram createRam(Ram ram);

    Ram updateRam(Ram ram);

    void deleteRam(Long id);
}
