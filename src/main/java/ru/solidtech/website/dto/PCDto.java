package ru.solidtech.website.dto;

import lombok.Data;
import ru.solidtech.website.model.*;

import java.util.List;

@Data
public class PCDto {
    private Long id;
    private MotherBoard motherBoard;
    private Integer motherBoardWarranty;
    private String motherBoardStore;
    private Processor processor;
    private Integer processorWarranty;
    private String processorStore;
    private Ram ram;
    private Integer ramWarranty;
    private String ramStore;
    private Cooler cooler;
    private Integer coolerWarranty;
    private String coolerStore;
    private Case casePc;
    private Integer caseWarranty;
    private String caseStore;
    private Videocard videocard;
    private Integer videocardWarranty;
    private String videocardStore;
    private StorageDevice storageDevice;
    private Integer storageDeviceWarranty;
    private String storageDeviceStore;
    private PowerSupply powerSupply;
    private Integer powerSupplyWarranty;
    private String powerSupplyStore;
    private int price;
    private String imageUrl;
    private Boolean isForSale;
    private List<String> imageUrls; // Список URL изображений
}