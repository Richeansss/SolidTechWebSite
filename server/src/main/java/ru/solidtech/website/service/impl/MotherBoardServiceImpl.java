package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.MotherBoard;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.ChipsetRepository;
import ru.solidtech.website.repository.MotherBoardRepository;
import ru.solidtech.website.repository.SocketRepository;
import ru.solidtech.website.service.MotherBoardService;

import java.util.List;

@Service
@AllArgsConstructor
public class MotherBoardServiceImpl implements MotherBoardService {

    private final MotherBoardRepository motherBoardRepository;
    private final BrandRepository brandRepository;
    private final SocketRepository socketRepository;
    private final ChipsetRepository chipsetRepository;

    @Override
    public List<MotherBoard> findAllMotherBoards() {
        return motherBoardRepository.findAll();
    }

    @Override
    public MotherBoard findMotherBoardById(Long id) {
        return motherBoardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Материнская плата не найдена с ID: " + id));
    }

    @Override
    public MotherBoard createMotherBoard(MotherBoard motherBoard) {
        // Установка бренда
        motherBoard.setBrand(getEntityById(motherBoard.getBrand().getId(), brandRepository, "Бренд"));

        // Установка сокета
        motherBoard.setSocket(getEntityById(motherBoard.getSocket().getId(), socketRepository, "Сокет"));

        // Установка чипсета
        motherBoard.setChipset(getEntityById(motherBoard.getChipset().getId(), chipsetRepository, "Чипсет"));

        return motherBoardRepository.save(motherBoard); // Сохраняем MotherBoard
    }

    // Универсальный метод для загрузки связанных сущностей
    private <T> T getEntityById(Long id, JpaRepository<T, Long> repository, String entityName) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(entityName + " с ID " + id + " не найден"));
    }

    @Override
    public MotherBoard updateMotherBoard(MotherBoard motherBoard) {
        if (!motherBoardRepository.existsById(motherBoard.getId())) {
            throw new IllegalArgumentException("Материнская плата с ID " + motherBoard.getId() + " не найдена");
        }

        // Проверка, существует ли бренд в базе данных
        if (motherBoard.getBrand() != null && motherBoard.getBrand().getId() != null) {
            if (!brandRepository.existsById(motherBoard.getBrand().getId())) {
                throw new IllegalArgumentException("Бренд с ID " + motherBoard.getBrand().getId() + " не найден");
            }
        } else {
            throw new IllegalArgumentException("Бренд материнской платы не может быть null");
        }

        // Проверка существования сокета
        if (motherBoard.getSocket() != null && motherBoard.getSocket().getId() != null) {
            if (!socketRepository.existsById(motherBoard.getSocket().getId())) {
                throw new IllegalArgumentException("Сокет с ID " + motherBoard.getSocket().getId() + " не найден");
            }
        }

        // Проверка существования чипсета
        if (motherBoard.getChipset() != null && motherBoard.getChipset().getId() != null) {
            if (!chipsetRepository.existsById(motherBoard.getChipset().getId())) {
                throw new IllegalArgumentException("Чипсет с ID " + motherBoard.getChipset().getId() + " не найден");
            }
        }

        // Дополнительная проверка на корректность данных (например, если name пустое)
        if (motherBoard.getName() == null || motherBoard.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Название материнской платы не может быть пустым");
        }

        // Если все проверки прошли, сохраняем материнскую плату
        return motherBoardRepository.save(motherBoard);
    }


    @Override
    public void deleteMotherBoard(Long id) {
        if (!motherBoardRepository.existsById(id)) {
            throw new IllegalArgumentException("Материнская плата не найдена с ID: " + id);
        }
        motherBoardRepository.deleteById(id);
    }
}
