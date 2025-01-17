package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Processor;
import ru.solidtech.website.repository.ProcessorRepository;
import ru.solidtech.website.service.ProcessorService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProcessorServiceImpl implements ProcessorService {
    private static final Logger logger = LoggerFactory.getLogger(ProcessorServiceImpl.class);
    private final ProcessorRepository processorRepository;

    @Override
    public List<Processor> findAllProcessors() {
        logger.info("Получение списка всех процессоров");
        return processorRepository.findAll();
    }

    @Override
    public Processor findProcessorById(Long id) {
        logger.info("Поиск процессора с ID: {}", id);
        Optional<Processor> optionalProcessor = processorRepository.findById(id);
        return optionalProcessor.orElseThrow(() -> new IllegalArgumentException("Процессор с ID " + id + " не найден"));
    }

    @Override
    public Processor createProcessor(Processor processor) {
        logger.info("Создание нового процессора: {}", processor);
        return processorRepository.save(processor);
    }

    @Override
    public Processor updateProcessor(Processor processor) {
        logger.info("Обновление процессора с ID: {}", processor.getId());
        if (!processorRepository.existsById(processor.getId())) {
            throw new IllegalArgumentException("Процессор с ID " + processor.getId() + " не найден");
        }
        return processorRepository.save(processor);
    }

    @Override
    public void deleteProcessor(Long id) {
        logger.info("Удаление процессора с ID: {}", id);
        if (!processorRepository.existsById(id)) {
            throw new IllegalArgumentException("Процессор с ID " + id + " не найден");
        }
        processorRepository.deleteById(id);
    }

    @Override
    public String saveImage(Long id, MultipartFile file) throws IOException {
        // Получаем видеокарту по ID
        Processor processor = findProcessorById(id);

        if (processor == null) {
            throw new IllegalArgumentException("Видеокарта с указанным ID не найдена");
        }

        // Получаем имя бренда и имя видеокарты (проверка на null и замена пробелов)
        String brandName = processor.getBrand() != null && processor.getBrand().getName() != null
                ? processor.getBrand().getName().replaceAll("\\s+", "_")
                : "unknown_brand"; // Если бренд или его имя null, использовать "unknown_brand"
        String processorName = processor.getName() != null
                ? processor.getName().replaceAll("\\s+", "_")
                : "unknown_card"; // Если имя видеокарты null, использовать "unknown_card"

        // Название папки для сохранения
        Path folderPath = Paths.get("src/main/resources/static/public/images/" + processorName);

        // Создание папки, если её ещё нет
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        // Получаем оригинальное имя файла
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null || originalFileName.isEmpty()) {
            throw new IllegalArgumentException("Оригинальное имя файла отсутствует");
        }

        // Извлечение формата файла (расширения)
        String fileExtension;
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex != -1 && dotIndex < originalFileName.length() - 1) {
            fileExtension = originalFileName.substring(dotIndex);
        } else {
            throw new IllegalArgumentException("Формат файла отсутствует");
        }

        // Генерация уникального имени файла (brandName + cardName)
        String fileName = brandName + "_" + processorName + fileExtension;
        Path filePath = folderPath.resolve(fileName);

        // Сохранение файла
        Files.write(filePath, file.getBytes());

        // Сохранение ссылки на изображение в БД
        String imageUrl = "/images/processor/" + processorName + "/" + fileName;
        processor.setImageUrl(imageUrl);
        processorRepository.save(processor);

        return imageUrl;
    }
}
