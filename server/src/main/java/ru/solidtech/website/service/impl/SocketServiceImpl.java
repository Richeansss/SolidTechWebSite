package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Socket;
import ru.solidtech.website.repository.SocketRepository;
import ru.solidtech.website.service.SocketService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SocketServiceImpl implements SocketService {

    private final SocketRepository socketRepository;

    @Override
    public List<Socket> findAllSockets() {
        return socketRepository.findAll();
    }

    @Override
    public Socket findSocketById(Long id) {
        return socketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Socket с ID " + id + " не найден"));
    }

    @Override
    public Socket createSocket(Socket socketEntity) {
        return socketRepository.save(socketEntity); // Сохраняем Socket
    }

    @Override
    public Socket updateSocket(Socket socket) {
        if (!socketRepository.existsById(socket.getId())) {
            throw new IllegalArgumentException("Socket с ID " + socket.getId() + " не найден");
        }
        return socketRepository.save(socket);
    }

    @Override
    public void deleteSocket(Long id) {
        if (!socketRepository.existsById(id)) {
            throw new IllegalArgumentException("Socket с ID " + id + " не найден");
        }
        socketRepository.deleteById(id);
    }
}
