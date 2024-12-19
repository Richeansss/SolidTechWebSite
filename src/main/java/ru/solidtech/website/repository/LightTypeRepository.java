package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.LightType;

public interface LightTypeRepository extends JpaRepository<LightType, Long> {

}
