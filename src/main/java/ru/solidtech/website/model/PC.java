package ru.solidtech.website.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Data
@Entity
public class PC {
    @Id
    @GeneratedValue
    private long id;
    private String firstName;
    private String lastName;
    private int price;

}
