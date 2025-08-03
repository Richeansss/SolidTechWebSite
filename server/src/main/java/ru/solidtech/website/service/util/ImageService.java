package ru.solidtech.website.service.util;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;

@Service
public class ImageService {

    public <T> String saveImage(
            Long id,
            MultipartFile file,
            Function<Long, Optional<T>> entityFinder,
            BiConsumer<T, String> imageUrlSetter,
            Consumer<T> entitySaver,
            String folderPrefix
    ) throws IOException {

        T entity = entityFinder.apply(id).orElseThrow(() ->
                new IllegalArgumentException("Сущность с ID " + id + " не найдена"));

        String entityId = String.valueOf(id);

        Path folderPath = Paths.get("/tmp/data/images/" + folderPrefix + "/" + entityId);
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null || originalFileName.isEmpty()) {
            throw new IllegalArgumentException("Оригинальное имя файла отсутствует");
        }

        String fileExtension;
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex != -1 && dotIndex < originalFileName.length() - 1) {
            fileExtension = originalFileName.substring(dotIndex);
        } else {
            throw new IllegalArgumentException("Формат файла отсутствует");
        }

        String fileName = entityId + fileExtension;
        Path filePath = folderPath.resolve(fileName);
        Files.write(filePath, file.getBytes());

        String imageUrl = "/images/" + folderPrefix + "/" + entityId + "/" + fileName;
        imageUrlSetter.accept(entity, imageUrl);
        entitySaver.accept(entity);

        return imageUrl;
    }
}
