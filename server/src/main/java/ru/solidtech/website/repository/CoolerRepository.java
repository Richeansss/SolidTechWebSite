package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Cooler;

public interface CoolerRepository extends JpaRepository<Cooler, Long> {
}
