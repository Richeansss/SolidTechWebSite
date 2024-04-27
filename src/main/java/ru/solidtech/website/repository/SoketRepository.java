package ru.solidtech.website.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Soket;

public interface SoketRepository extends JpaRepository<Soket, Long> {
    void deleteById(Long id);
    Soket findSoketByName(String name);
    Soket findSoketById(Long id);
}
