package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import ru.solidtech.website.dto.PCComponentDTO;
import ru.solidtech.website.model.*;
import ru.solidtech.website.model.enums.ComponentType;
import ru.solidtech.website.repository.*;
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
            ProcessorRepository processorRepository,
            RamRepository ramRepository,
            CoolerRepository coolerRepository,
            CaseRepository caseRepository,
            VideocardRepository videocardRepository,
            StorageDeviceRepository storageDeviceRepository,
            PowerSupplyRepository powerSupplyRepository
    ) {
        this.pcComponentRepository = pcComponentRepository;
        this.pcRepository = pcRepository;
        this.repositoryMap = Map.of(
                ComponentType.MOTHERBOARD, motherBoardRepository,
                ComponentType.RAM, ramRepository,
                ComponentType.COOLER, coolerRepository,
                ComponentType.CASE, caseRepository,
                ComponentType.VIDEOCARD, videocardRepository,
                ComponentType.STORAGE_DEVICE, storageDeviceRepository,
                ComponentType.POWER_SUPPLY, powerSupplyRepository,
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
    public List<PCComponentDTO> findAllComponents() {
        List<PCComponent> components = pcComponentRepository.findAll();

        return components.stream()
                .map(this::convertToDetailedDTO) // Метод для создания DTO с деталями
                .toList();
    }

    private PCComponentDTO convertToDetailedDTO(PCComponent component) {
        PCComponentDTO dto = convertToDTO(component); // Базовое преобразование

        // Получаем подробности
        Object details = getComponentDetails(component);
        dto.setDetails(details); // Добавляем в DTO

        return dto;
    }

    private PCComponentDTO convertToDTO(PCComponent component) {
        PCComponentDTO dto = new PCComponentDTO();
        dto.setId(component.getId());
        // Проверяем, что объект PC не null, и если он не null, проверяем, что getId() не null
        if (component.getPc() != null && component.getPc().getId() != null) {
            dto.setPcId(component.getPc().getId()); // Берем ID ПК
        } else {
            dto.setPcId(null); // Или любое другое значение по умолчанию
        }

        dto.setComponentType(component.getComponentType());
        dto.setComponentId(component.getComponentId());
        dto.setWarrantyMonths(component.getWarrantyMonths());
        dto.setStore(component.getStore());
        return dto;
    }

    @Override
    public PCComponent findComponentById(Long id) {
        return pcComponentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Компонент с ID " + id + " не найден"));
    }

    @Override
    public PCComponent createComponent(PCComponent component) {
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

    @Override
    public PCComponentDTO getComponentById(Long id) {
        PCComponent component = pcComponentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Компонент с ID " + id + " не найден"));

        return convertToDetailedDTO(component);
    }

    public List<PCComponent> findComponentsByType(ComponentType componentType) {
        return pcComponentRepository.findByComponentType(componentType);
    }
}
