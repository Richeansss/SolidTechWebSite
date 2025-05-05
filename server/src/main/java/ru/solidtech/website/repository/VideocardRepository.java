package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Videocard;

public interface VideocardRepository extends JpaRepository<Videocard, Long> {
}
