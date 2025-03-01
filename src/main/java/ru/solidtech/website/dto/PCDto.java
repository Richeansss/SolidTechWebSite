package ru.solidtech.website.dto;

import lombok.Data;

import java.util.List;

@Data
public class PCDto {
    private Long id;
    private String motherBoard;
    private Integer motherBoardWarranty;
    private String motherBoardStore;
    private String processor;
    private Integer processorWarranty;
    private String processorStore;
    private String ram;
    private Integer ramWarranty;
    private String ramStore;
    private String cooler;
    private Integer coolerWarranty;
    private String coolerStore;
    private String casePc;
    private Integer caseWarranty;
    private String caseStore;
    private String videocard;
    private Integer videocardWarranty;
    private String videocardStore;
    private String storageDevice;
    private Integer storageDeviceWarranty;
    private String storageDeviceStore;
    private String powerSupply;
    private Integer powerSupplyWarranty;
    private String powerSupplyStore;
    private int price;
    private String imageUrl;
    private Boolean isForSale;
    private List<String> imageUrls; // Список URL изображений
}