package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Processor;
import ru.solidtech.website.repository.ProcessorRepository;
import ru.solidtech.website.service.ProcessorService;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProcessorServiceImpl implements ProcessorService {
    private static final Logger logger = LoggerFactory.getLogger(ProcessorServiceImpl.class);
    private final ProcessorRepository processorRepository;

    @Override
    public List<Processor> findAllProcessors() {
        logger.info("Получение списка всех процессоров");
        return processorRepository.findAll();
    }

    @Override
    public Processor findProcessorById(Long id) {
        logger.info("Поиск процессора с ID: {}", id);
        Optional<Processor> optionalProcessor = processorRepository.findById(id);
        return optionalProcessor.orElseThrow(() -> new IllegalArgumentException("Процессор с ID " + id + " не найден"));
    }

    @Override
    public Processor createProcessor(Processor processor) {
        logger.info("Создание нового процессора: {}", processor);
        return processorRepository.save(processor);
    }

    @Override
    public Processor updateProcessor(Processor processor) {
        logger.info("Обновление процессора с ID: {}", processor.getId());
        if (!processorRepository.existsById(processor.getId())) {
            throw new IllegalArgumentException("Процессор с ID " + processor.getId() + " не найден");
        }
        return processorRepository.save(processor);
    }

    @Override
    public void deleteProcessor(Long id) {
        logger.info("Удаление процессора с ID: {}", id);
        if (!processorRepository.existsById(id)) {
            throw new IllegalArgumentException("Процессор с ID " + id + " не найден");
        }
        processorRepository.deleteById(id);
    }
}
