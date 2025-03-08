package ru.solidtech.website.model;

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
    @JoinColumn(name = "pc_id", nullable = false)
    private PC pc;

    @Enumerated(EnumType.STRING)
    private ComponentType componentType; // Тип компонента (MOTHERBOARD, PROCESSOR и т. д.)

    private Long componentId; // ID комплектующего (будет ссылаться на любую таблицу)

    private Integer warrantyMonths; // Гарантия в месяцах

    @Enumerated(EnumType.STRING)
    private TypeStore store; // Магазин

    public enum TypeStore {
        AVITO, OZON, DNS, ONLINETRADE, ALIEXPRESS, CITILINK;
    }
}
