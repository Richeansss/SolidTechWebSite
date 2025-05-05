package ru.solidtech.website.dto;

import lombok.Data;

import java.util.List;

@Data
public class PCDto {
    private Long id;

    private PCComponentDTO motherBoard;
    private PCComponentDTO processor;
    private PCComponentDTO ram;
    private PCComponentDTO cooler;
    private PCComponentDTO casePc;
    private PCComponentDTO videocard;
    private PCComponentDTO storageDevice;
    private PCComponentDTO powerSupply;

    private int price;
    private String imageUrl;
    private Boolean isForSale;

    private List<String> imagesUrl; // Список URL изображений
}
