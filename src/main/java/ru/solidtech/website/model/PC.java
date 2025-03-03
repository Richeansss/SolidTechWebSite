package ru.solidtech.website.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pcs")
@Data
public class PC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int price;
    private String imageUrl;
    private Boolean isForSale;

    @OneToMany(mappedBy = "pc", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PCComponent> components = new ArrayList<>();

    @OneToMany(mappedBy = "pc", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();
}

