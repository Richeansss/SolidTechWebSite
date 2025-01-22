package ru.solidtech.website.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class FPSBuild {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "fpsBuild", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<GameFPSCount> gameFPSCounts;
}