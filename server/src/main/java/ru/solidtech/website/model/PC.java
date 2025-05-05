package ru.solidtech.website.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class PC {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mother_board_id")
    private PCComponent motherBoard;

    @ManyToOne
    @JoinColumn(name = "processor_id")
    private PCComponent processor;

    @ManyToOne
    @JoinColumn(name = "ram_id")
    private PCComponent ram;

    @ManyToOne
    @JoinColumn(name = "cooler_id")
    private PCComponent cooler;

    @ManyToOne
    @JoinColumn(name = "case_pc_id")
    private PCComponent case_pc;

    @ManyToOne
    @JoinColumn(name = "videocard_id")
    private PCComponent videocard;

    @ManyToOne
    @JoinColumn(name = "storage_device_id")
    private PCComponent storageDevice;

    @ManyToOne
    @JoinColumn(name = "power_supply_id")
    private PCComponent powerSupply;

    private int price;

    @Column(name = "image_url")
    private String imageUrl;

    private Boolean isForSale;

    @OneToMany(mappedBy = "pc", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();
}