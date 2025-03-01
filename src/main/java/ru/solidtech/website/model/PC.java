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
    private MotherBoard motherBoard;
    private Integer motherBoardWarranty;
    private TypeStore motherBoardStore;

    @ManyToOne
    @JoinColumn(name = "processor_id")
    private Processor processor;
    private Integer processorWarranty;
    private TypeStore processorStore;

    @ManyToOne
    @JoinColumn(name = "ram_id")
    private Ram ram;
    private Integer ramWarranty;
    private TypeStore ramStore;

    @ManyToOne
    @JoinColumn(name = "cooler_id")
    private Cooler cooler;
    private Integer coolerWarranty;
    private TypeStore coolerStore;

    @ManyToOne
    @JoinColumn(name = "case_pc_id")
    private Case case_pc;
    private Integer caseWarranty;
    private TypeStore caseStore;

    @ManyToOne
    @JoinColumn(name = "videocard_id")
    private Videocard videocard;
    private Integer videocardWarranty;
    private TypeStore videocardStore;

    @ManyToOne
    @JoinColumn(name = "storage_device_id")
    private StorageDevice storageDevice;
    private Integer storageDeviceWarranty;
    private TypeStore storageDeviceStore;

    @ManyToOne
    @JoinColumn(name = "power_supply_id")
    private PowerSupply powerSupply;
    private Integer powerSupplyWarranty;
    private TypeStore powerSupplyStore;

    private int price;
    @Column(name = "image_url")
    private String imageUrl;
    private Boolean isForSale;

    @OneToMany(mappedBy = "pc", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();

    public enum TypeStore {

        Avito,

        Ozon,

        DNS,

        OnlineTrade,

        Aliexpress,

        Citilink
    }
}
