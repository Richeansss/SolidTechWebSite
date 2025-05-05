package ru.solidtech.website.mapper;

import ru.solidtech.website.dto.PCComponentDTO;
import ru.solidtech.website.dto.PCDto;
import ru.solidtech.website.model.PC;
import ru.solidtech.website.model.PCComponent;
import org.springframework.stereotype.Component;
import ru.solidtech.website.service.PCComponentService;

import java.util.stream.Collectors;

@Component
public class PCMapper {

    private final PCComponentService pcComponentService;

    public PCMapper(PCComponentService pcComponentService) {
        this.pcComponentService = pcComponentService;
    }

    public PCDto toDto(PC pc) {
        PCDto dto = new PCDto();
        dto.setId(pc.getId());

        dto.setMotherBoard(convertToDetailedDTO(pc.getMotherBoard()));
        dto.setProcessor(convertToDetailedDTO(pc.getProcessor()));
        dto.setRam(convertToDetailedDTO(pc.getRam()));
        dto.setCooler(convertToDetailedDTO(pc.getCooler()));
        dto.setCasePc(convertToDetailedDTO(pc.getCase_pc()));
        dto.setVideocard(convertToDetailedDTO(pc.getVideocard()));
        dto.setStorageDevice(convertToDetailedDTO(pc.getStorageDevice()));
        dto.setPowerSupply(convertToDetailedDTO(pc.getPowerSupply()));

        dto.setPrice(pc.getPrice());
        dto.setImageUrl(pc.getImageUrl());
        dto.setIsForSale(pc.getIsForSale());

        dto.setImagesUrl(pc.getImages().stream()
                .map(image -> image.getUrl())
                .collect(Collectors.toList()));

        return dto;
    }

    private PCComponentDTO convertToDetailedDTO(PCComponent component) {
        if (component == null) return null;

        PCComponentDTO dto = new PCComponentDTO();
        dto.setId(component.getId());
        dto.setPcId(component.getPc() != null ? component.getPc().getId() : null);
        dto.setComponentType(component.getComponentType());
        dto.setComponentId(component.getComponentId());
        dto.setWarrantyMonths(component.getWarrantyMonths());
        dto.setStore(component.getStore());

        // Добавим детали
        Object details = pcComponentService.getComponentDetails(component);
        dto.setDetails(details);

        return dto;
    }
}
