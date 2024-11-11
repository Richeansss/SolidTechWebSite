package ru.solidtech.website.service.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.Brand;
import ru.solidtech.website.model.Videocard;
import ru.solidtech.website.repository.BrandRepository;
import ru.solidtech.website.repository.VideocardRepository;
import ru.solidtech.website.service.VideocardService;

import java.util.List;

@Service
@AllArgsConstructor
public class VideocardServiceImpl implements VideocardService {

    private static final Logger logger = LoggerFactory.getLogger(VideocardServiceImpl.class);
    private final VideocardRepository videocardRepository;
    private final BrandRepository brandRepository;

    @Override
    public List<Videocard> findAllVideocards() {
        return videocardRepository.findAll();
    }

    @Override
    public Videocard findVideocardById(Long id) {
        return videocardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Видеокарта не найдена с ID: " + id));
    }

    @Override
    public Videocard createVideocard(Videocard videocard) {
        Brand brand = brandRepository.findById(videocard.getBrand().getId())
                .orElseThrow(() -> new IllegalArgumentException("Бренд с ID " + videocard.getBrand().getId() + " не найден"));

        videocard.setBrand(brand); // Устанавливаем загруженный бренд для видеокарты
        return videocardRepository.save(videocard);
    }

    @Override
    public Videocard updateVideocard(Videocard videocard) {
        if (!videocardRepository.existsById(videocard.getId())) {
            throw new IllegalArgumentException("Видеокарта не найдена с ID: " + videocard.getId());
        }
        return videocardRepository.save(videocard);
    }

    @Override
    public void deleteVideocard(Long id) {
        if (!videocardRepository.existsById(id)) {
            throw new IllegalArgumentException("Видеокарта не найдена с ID: " + id);
        }
        videocardRepository.deleteById(id);
    }
}
