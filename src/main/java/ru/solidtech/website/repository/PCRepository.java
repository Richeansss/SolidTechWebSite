package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.PC;

public interface PCRepository extends JpaRepository<PC, Long> {

}
