package ru.solidtech.website.service;

import ru.solidtech.website.model.LightType;

import java.util.List;

public interface LightTypeService {
    List<LightType> findAllLightTypes();
    LightType findLightTypeById(Long id);
    LightType createLightType(LightType lightType);
    LightType updateLightType(LightType lightType);
    void deleteLightType(Long id);
}
