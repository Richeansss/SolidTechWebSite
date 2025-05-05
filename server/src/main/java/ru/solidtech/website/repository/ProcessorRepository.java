package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Processor;


public interface ProcessorRepository extends JpaRepository<Processor, Long> {
    void deleteById(Long id);
    Processor findProcessorByBrandId(Long brand_id);
    Processor findProcessorByName(String name);
}