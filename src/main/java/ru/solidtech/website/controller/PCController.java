package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.solidtech.website.model.PC;
import ru.solidtech.website.service.PCService;


import java.util.List;

@RestController
@RequestMapping("/api/v1/PC")
@AllArgsConstructor
public class PCController {
    private final PCService servicePC;

    @GetMapping
    public List<PC> findAllPC(){
        return servicePC.findAllPC();
    }
}
