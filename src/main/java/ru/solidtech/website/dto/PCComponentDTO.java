package ru.solidtech.website.dto;

import lombok.Data;
import ru.solidtech.website.model.enums.ComponentType;
import ru.solidtech.website.model.PCComponent.TypeStore;

@Data
public class PCComponentDTO {
    private Long id;
    private Long pcId; // Только ID ПК
    private ComponentType componentType;
    private Long componentId;
    private Integer warrantyMonths;
    private TypeStore store;


}


