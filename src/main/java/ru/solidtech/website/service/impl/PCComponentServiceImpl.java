package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.PC;
import ru.solidtech.website.model.PCComponent;
import ru.solidtech.website.model.enums.ComponentType;
import ru.solidtech.website.repository.MotherBoardRepository;
import ru.solidtech.website.repository.PCComponentRepository;
import ru.solidtech.website.repository.PCRepository;
import ru.solidtech.website.repository.ProcessorRepository;
import ru.solidtech.website.service.PCComponentService;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class PCComponentServiceImpl implements PCComponentService {
    private final PCComponentRepository pcComponentRepository;
    private final PCRepository pcRepository;
    private final Map<ComponentType, JpaRepository<?, Long>> repositoryMap;

    //Позволяет динамически выбирать нужный репозиторий по ComponentType без явных
    @Autowired
    public PCComponentServiceImpl(
            PCComponentRepository pcComponentRepository,
            PCRepository pcRepository,
            MotherBoardRepository motherBoardRepository,
            ProcessorRepository processorRepository
    ) {
        this.pcComponentRepository = pcComponentRepository;
        this.pcRepository = pcRepository;
        this.repositoryMap = Map.of(
                ComponentType.MOTHERBOARD, motherBoardRepository,
                ComponentType.PROCESSOR, processorRepository
        );
    }

    @Override
    public Object getComponentDetails(PCComponent pcComponent) {
        JpaRepository<?, Long> repository = repositoryMap.get(pcComponent.getComponentType());
        if (repository == null) {
            throw new IllegalArgumentException("Неизвестный тип компонента: " + pcComponent.getComponentType());
        }
        return repository.findById(pcComponent.getComponentId()).orElse(null);
    }

    @Override
    public List<PCComponent> findAllComponents() {
        return pcComponentRepository.findAll();
    }

    @Override
    public PCComponent findComponentById(Long id) {
        return pcComponentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Компонент с ID " + id + " не найден"));
    }

    @Override
    public PCComponent createComponent(PCComponent component) {
        if (component.getPc() == null || component.getPc().getId() == null) {
            throw new IllegalArgumentException("Необходимо указать существующий PC");
        }

        PC pc = pcRepository.findById(component.getPc().getId())
                .orElseThrow(() -> new IllegalArgumentException("PC с ID " + component.getPc().getId() + " не найден"));

        component.setPc(pc);
        return pcComponentRepository.save(component);
    }


    @Override
    public PCComponent updateComponent(PCComponent component) {
        if (!pcComponentRepository.existsById(component.getId())) {
            throw new IllegalArgumentException("Компонент с ID " + component.getId() + " не найден");
        }
        return pcComponentRepository.save(component);
    }

    @Override
    public void deleteComponent(Long id) {
        if (!pcComponentRepository.existsById(id)) {
            throw new IllegalArgumentException("Компонент с ID " + id + " не найден");
        }
        pcComponentRepository.deleteById(id);
    }

    public List<PCComponent> findComponentsByType(ComponentType componentType) {
        return pcComponentRepository.findByComponentType(componentType);
    }
}
