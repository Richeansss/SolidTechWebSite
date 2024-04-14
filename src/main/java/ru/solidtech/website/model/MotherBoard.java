package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class MotherBoard {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    private String soket;
    private String chipset;
    private String typeOfMemory;
    private int price;
    private String url;
}
