package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.solidtech.website.model.Processor;
import ru.solidtech.website.repository.ProcessorRepository;
import ru.solidtech.website.service.ProcessorService;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class ProcessorServiceImp implements ProcessorService {
    private final ProcessorRepository repository;

    @Override
    public List<Processor> findAllProcessor() {
        return repository.findAll();
    }

    @Override
    public Processor saveProcessor(Processor processor) {
        return repository.save(processor);
    }

    @Override
    public Processor findProcessorByName(String name) {
        return repository.findProcessorByName(name);
    }

    @Override
    public Processor updateProcessor(Processor processor) {
        return repository.save(processor);
    }

    @Override
    @Transactional
    public void deleteProcessor(Long id) {
        repository.deleteById(id);
    }


}
