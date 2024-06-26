package ru.solidtech.website.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.FPSBuild;

public interface FPSBuildRepository extends JpaRepository<FPSBuild, Long> {
    void deleteById(Long id);
    FPSBuild findFPSBuildById(Long id);
}
