package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.solidtech.website.model.PC;

@Repository
public interface PCRepository extends JpaRepository<PC, Long> {

}
