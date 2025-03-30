package ru.solidtech.website.mapper;

import ru.solidtech.website.dto.PCComponentDTO;
import ru.solidtech.website.dto.PCDto;
import ru.solidtech.website.model.PC;
import ru.solidtech.website.model.PCComponent;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import ru.solidtech.website.service.PCComponentService;

@Component
public class PCMapper {

    private final PCComponentService pcComponentService;

    public PCMapper(PCComponentService pcComponentService) {
        this.pcComponentService = pcComponentService;
    }

    public PCDto toDto(PC pc) {
        PCDto dto = new PCDto();
        dto.setId(pc.getId());
        dto.setMotherBoard(pc.getMotherBoard());
        dto.setMotherBoardWarranty(pc.getMotherBoardWarranty());
        dto.setMotherBoardStore(pc.getMotherBoardStore().toString());
        dto.setProcessor(pc.getProcessor());
        dto.setProcessorWarranty(pc.getProcessorWarranty());
        dto.setProcessorStore(pc.getProcessorStore().toString());
        dto.setRam(pc.getRam());
        dto.setRamWarranty(pc.getRamWarranty());
        dto.setRamStore(pc.getRamStore().toString());
        dto.setCooler(pc.getCooler());
        dto.setCoolerWarranty(pc.getCoolerWarranty());
        dto.setCoolerStore(pc.getCoolerStore().toString());
        dto.setCasePc(pc.getCase_pc());
        dto.setCaseWarranty(pc.getCaseWarranty());
        dto.setCaseStore(pc.getCaseStore().toString());
        dto.setVideocard(pc.getVideocard());
        dto.setVideocardWarranty(pc.getVideocardWarranty());
        dto.setVideocardStore(pc.getVideocardStore().toString());
        dto.setStorageDevice(pc.getStorageDevice());
        dto.setStorageDeviceWarranty(pc.getStorageDeviceWarranty());
        dto.setStorageDeviceStore(pc.getStorageDeviceStore().toString());
        dto.setPowerSupply(pc.getPowerSupply());
        dto.setPowerSupplyWarranty(pc.getPowerSupplyWarranty());
        dto.setPowerSupplyStore(pc.getPowerSupplyStore().toString());
        dto.setPrice(pc.getPrice());
        dto.setImageUrl(pc.getImageUrl());
        dto.setIsForSale(pc.getIsForSale());

        // Преобразуем список изображений в список URL
        dto.setImagesUrl(pc.getImages().stream()
                .map(image -> image.getUrl())
                .collect(Collectors.toList()));

        // Добавляем компоненты с details
        dto.setComponents(pc.getComponents().stream()
                .map(this::convertToDetailedDTO)
                .collect(Collectors.toList()));

        return dto;
    }

    private PCComponentDTO convertToDetailedDTO(PCComponent component) {
        PCComponentDTO dto = convertToDTO(component);

        // Получаем details
        Object details = pcComponentService.getComponentDetails(component);
        dto.setDetails(details);

        return dto;
    }

    private PCComponentDTO convertToDTO(PCComponent component) {
        PCComponentDTO dto = new PCComponentDTO();
        dto.setId(component.getId());
        if (component.getPc() != null) {
            dto.setPcId(component.getPc().getId());
        } else {
            // Можно вернуть значение по умолчанию, например, -1 или другое значение
            dto.setPcId(null);  // Значение по умолчанию (можно оставить null, если нужно)
        }
        dto.setComponentType(component.getComponentType());
        dto.setComponentId(component.getComponentId());
        dto.setWarrantyMonths(component.getWarrantyMonths());
        dto.setStore(component.getStore());
        return dto;
    }
}
