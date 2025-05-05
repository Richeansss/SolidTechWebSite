package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "case_pc")
public class Case {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Enumerated(EnumType.STRING)
    @Column(name = "form_factor", nullable = false)
    private FormFactor formFactor;

    @Column(name = "amount_fun", nullable = false)
    private Long amountFun;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @ManyToOne
    @JoinColumn(name = "light_type_id")
    private LightType lightType;

    @Column(name = "fun_connector")
    private Long funConnector;

    @Enumerated(EnumType.STRING)
    @Column(name = "color", nullable = false)
    private Videocard.Color color;

    @Enumerated(EnumType.STRING)
    @Column(name = "glass_type", nullable = false)
    private GlassType glassType;

    @Column(name = "image_url")
    private String imageUrl;

    public enum GlassType {
        TEMPERED,   // Закаленное стекло
        ACRYLIC,    // Акриловое стекло
        NONE        // Отсутствует
    }

    public enum FormFactor {
        ATX,
        MICRO_ATX,
        MINI_ITX,
        E_ATX,       // Extended ATX
        XL_ATX,      // Extra Large ATX
        FLEX_ATX,
        MINI_STX,    // Mini-STX (5x5)
        NANO_ITX,
        PICO_ITX,
        SSI_CEB,     // Server форм-фактор
        SSI_EEB      // Server форм-фактор (Extended)    // Отсутствует
    }
}
