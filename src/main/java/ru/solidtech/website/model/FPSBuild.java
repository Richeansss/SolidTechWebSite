package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class FPSBuild {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;

    //todo добавить внешнуюю связь проца и видюхи

    @ManyToOne
    @JoinColumn(name = "game1_id")
    private Game game1;

    @ManyToOne
    @JoinColumn(name = "game2_id")
    private Game game2;

    @ManyToOne
    @JoinColumn(name = "game3_id")
    private Game game3;

    @ManyToOne
    @JoinColumn(name = "game4_id")
    private Game game4;

    @ManyToOne
    @JoinColumn(name = "game5_id")
    private Game game5;

    @ManyToOne
    @JoinColumn(name = "game6_id")
    private Game game6;

    @ManyToOne
    @JoinColumn(name = "game7_id")
    private Game game7;

    @ManyToOne
    @JoinColumn(name = "game8_id")
    private Game game8;

    @ManyToOne
    @JoinColumn(name = "game9_id")
    private Game game9;

    @ManyToOne
    @JoinColumn(name = "game10_id")
    private Game game10;

    @ManyToOne
    @JoinColumn(name = "game11_id")
    private Game game11;

    @ManyToOne
    @JoinColumn(name = "game12_id")
    private Game game12;

    @ManyToOne
    @JoinColumn(name = "game13_id")
    private Game game13;

    @ManyToOne
    @JoinColumn(name = "game14_id")
    private Game game14;

    @ManyToOne
    @JoinColumn(name = "game15_id")
    private Game game15;
}