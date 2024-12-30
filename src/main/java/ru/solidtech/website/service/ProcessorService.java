package ru.solidtech.website.service;

import ru.solidtech.website.model.Processor;

import java.util.List;

public interface ProcessorService {
    /**
     * Получить список всех процессоров
     * @return список процессоров
     */
    List<Processor> findAllProcessors();

    /**
     * Найти процессор по его ID
     * @param id идентификатор процессора
     * @return найденный процессор
     */
    Processor findProcessorById(Long id);

    /**
     * Создать новый процессор
     * @param processor объект процессора
     * @return созданный процессор
     */
    Processor createProcessor(Processor processor);

    /**
     * Обновить существующий процессор
     * @param processor объект процессора
     * @return обновленный процессор
     */
    Processor updateProcessor(Processor processor);

    /**
     * Удалить процессор по его ID
     * @param id идентификатор процессора
     */
    void deleteProcessor(Long id);
}
