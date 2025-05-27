package ru.solidtech.website.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import ru.solidtech.website.model.enums.ComponentType;

@Entity
@Table(name = "pc_components")
@Data
public class PCComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "pc_id", nullable = true) // Может быть null, если на складе
    private PC pc;

    @Enumerated(EnumType.STRING)
    private ComponentType componentType; // Тип компонента (MOTHERBOARD, PROCESSOR и т. д.)

    private Long componentId; // ID комплектующего (ссылка на справочник)

    private Integer warrantyMonths; // Гарантия в месяцах

    @Enumerated(EnumType.STRING)
    private TypeStore store; // Магазин

    public enum TypeStore {
        AVITO, OZON, DNS, ONLINETRADE, ALIEXPRESS, CITILINK;
    }

    @Column(unique = true)
    private String serialNumber;

    private String eanCode;


    /**
     * Проверяет, находится ли компонент на складе (если не привязан к PC).
     */
    public boolean isStored() {
        return pc == null;
    }
}
