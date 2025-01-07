package ru.solidtech.website.service;

import ru.solidtech.website.model.PC;

import java.util.List;

public interface PCService {
    List<PC> findAllPCs();

    PC findPCById(Long id);

    PC createPC(PC pc);

    PC updatePC(PC pc);

    void deletePC(Long id);
}
