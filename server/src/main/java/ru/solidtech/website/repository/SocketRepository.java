package ru.solidtech.website.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.solidtech.website.model.Socket;

public interface SocketRepository extends JpaRepository<Socket, Long> {
    void deleteById(Long id);
    Socket findSocketByName(String name);
    Socket findSocketById(Long id);
}
