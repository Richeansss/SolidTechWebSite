package ru.solidtech.website.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Chipset;

public interface ChipsetRepository extends JpaRepository<Chipset, Long> {
    void deleteById(Long id);
    Chipset findChipsetByName(String name);
    Chipset findChipsetById(Long id);
}
