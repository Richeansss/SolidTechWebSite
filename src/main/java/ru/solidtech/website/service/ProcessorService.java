package ru.solidtech.website.service;

import ru.solidtech.website.model.Processor;

import java.util.List;

public interface ProcessorService {
    List<Processor> findAllProcessor();
    Processor saveProcessor(Processor processor);
    Processor findProcessorByName(String name);
    Processor updateProcessor(Processor processor);
    void deleteProcessor(Long id);
}
