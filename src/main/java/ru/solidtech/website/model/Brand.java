package ru.solidtech.website.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Brand {
    @Id
    @GeneratedValue
    private long id;
    private String name;

}
