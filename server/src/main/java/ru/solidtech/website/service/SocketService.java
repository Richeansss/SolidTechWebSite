package ru.solidtech.website.service;

import ru.solidtech.website.model.Socket;

import java.util.List;

public interface SocketService {
    List<Socket> findAllSockets();
    Socket findSocketById(Long id);
    Socket createSocket(Socket socket);
    Socket updateSocket(Socket socket);
    void deleteSocket(Long id);
}
