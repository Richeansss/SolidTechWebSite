package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Case;

public interface CaseRepository extends JpaRepository<Case, Long> {
    // Дополнительные методы, если требуется
}
