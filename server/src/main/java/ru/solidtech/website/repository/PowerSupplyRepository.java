package ru.solidtech.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.solidtech.website.model.PowerSupply;

@Repository
public interface PowerSupplyRepository extends JpaRepository<PowerSupply, Long> {
    // Дополнительные кастомные запросы можно добавить здесь, если необходимо
}
