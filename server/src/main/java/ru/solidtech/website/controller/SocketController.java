package ru.solidtech.website.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.solidtech.website.model.Socket;
import ru.solidtech.website.response.ResponseBuilder;
import ru.solidtech.website.service.SocketService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/socket")
@AllArgsConstructor
public class SocketController {
    private static final Logger logger = LoggerFactory.getLogger(SocketController.class);
    private final SocketService socketService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllSockets() {
        List<Socket> socketList = socketService.findAllSockets();
        return ResponseBuilder.buildResponse(HttpStatus.OK, "Список сокетов успешно получен", socketList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getSocketById(@PathVariable Long id) {
        try {
            Socket foundSocket = socketService.findSocketById(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Сокет найден", foundSocket);
        } catch (IllegalArgumentException e) {
            logger.error("Сокет не найден с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createSocket(@RequestBody Socket socket) {
        try {
            Socket createdSocket = socketService.createSocket(socket);
            return ResponseBuilder.buildResponse(HttpStatus.CREATED, "Сокет успешно создан", createdSocket);
        } catch (Exception e) {
            logger.error("Ошибка при создании сокета", e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Не удалось создать сокет");
        }
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateSocket(@RequestBody Socket socket) {
        try {
            Socket updatedSocket = socketService.updateSocket(socket);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Сокет обновлен", updatedSocket);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось обновить сокет с ID: {}", socket.getId(), e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteSocket(@PathVariable Long id) {
        try {
            socketService.deleteSocket(id);
            return ResponseBuilder.buildResponse(HttpStatus.OK, "Сокет успешно удален", null);
        } catch (IllegalArgumentException e) {
            logger.error("Не удалось удалить сокет с ID: {}", id, e);
            return ResponseBuilder.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
