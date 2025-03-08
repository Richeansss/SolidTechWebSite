package ru.solidtech.website.service;

import ru.solidtech.website.model.PCComponent;
import ru.solidtech.website.model.enums.ComponentType;

import java.util.List;

public interface PCComponentService {
    List<PCComponent> findAllComponents();
    PCComponent findComponentById(Long id);
    PCComponent createComponent(PCComponent component);
    PCComponent updateComponent(PCComponent component);
    void deleteComponent(Long id);
    Object getComponentDetails(PCComponent pcComponent);
    List<PCComponent> findComponentsByType(ComponentType componentType);
}
