package ru.solidtech.website.mapper;

import ru.solidtech.website.dto.PCDto;
import ru.solidtech.website.model.PC;

import java.util.stream.Collectors;

public class PCMapper {

    public static PCDto toDto(PC pc) {
        PCDto dto = new PCDto();
        dto.setId(pc.getId());
        dto.setMotherBoard(pc.getMotherBoard().getName());
        dto.setMotherBoardWarranty(pc.getMotherBoardWarranty());
        dto.setMotherBoardStore(pc.getMotherBoardStore().toString());
        dto.setProcessor(pc.getProcessor().getName());
        dto.setProcessorWarranty(pc.getProcessorWarranty());
        dto.setProcessorStore(pc.getProcessorStore().toString());
        dto.setRam(pc.getRam().getName());
        dto.setRamWarranty(pc.getRamWarranty());
        dto.setRamStore(pc.getRamStore().toString());
        dto.setCooler(pc.getCooler().getName());
        dto.setCoolerWarranty(pc.getCoolerWarranty());
        dto.setCoolerStore(pc.getCoolerStore().toString());
        dto.setCasePc(pc.getCase_pc().getName());
        dto.setCaseWarranty(pc.getCaseWarranty());
        dto.setCaseStore(pc.getCaseStore().toString());
        dto.setVideocard(pc.getVideocard().getName());
        dto.setVideocardWarranty(pc.getVideocardWarranty());
        dto.setVideocardStore(pc.getVideocardStore().toString());
        dto.setStorageDevice(pc.getStorageDevice().getName());
        dto.setStorageDeviceWarranty(pc.getStorageDeviceWarranty());
        dto.setStorageDeviceStore(pc.getStorageDeviceStore().toString());
        dto.setPowerSupply(pc.getPowerSupply().getName());
        dto.setPowerSupplyWarranty(pc.getPowerSupplyWarranty());
        dto.setPowerSupplyStore(pc.getPowerSupplyStore().toString());
        dto.setPrice(pc.getPrice());
        dto.setImageUrl(pc.getImageUrl());
        dto.setIsForSale(pc.getIsForSale());

        // Преобразуем список изображений в список URL
        dto.setImageUrls(pc.getImages().stream()
                .map(image -> image.getUrl())
                .collect(Collectors.toList()));

        return dto;
    }
}