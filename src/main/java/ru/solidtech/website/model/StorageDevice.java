package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "storage_devices")
@Getter
@Setter
public class StorageDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand; // Связь с таблицей "brand"

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING) // Используем enum для ограничения значений
    private StorageType type;

    @Column(name = "capacity_gb", nullable = false)
    private Integer capacityGb;

    @Column(name = "form_factor", nullable = false)
    @Enumerated(EnumType.STRING)
    private FormFactor formFactor;

    @Column(name = "interface_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private InterfaceType interfaceType;

    @Column(name = "read_speed_mbps", nullable = false)
    private Integer readSpeedMbps;

    @Column(name = "write_speed_mbps", nullable = false)
    private Integer writeSpeedMbps;

    public enum StorageType {
        SSD,
        HDD
    }

    public enum FormFactor {
        FORM_2_5,   // Представляет "2.5"
        FORM_3_5,   // Представляет "3.5"
        M_2,
        PCIE_CARD
    }
    public enum InterfaceType {
        SATA,
        SATA_III,
        PCIE_3_0,
        PCIE_4_0,
        USB
    }
}
