package ru.solidtech.website.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class FPSBuild {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "fpsBuild", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GameFPSCount> gameFPSCounts;
}