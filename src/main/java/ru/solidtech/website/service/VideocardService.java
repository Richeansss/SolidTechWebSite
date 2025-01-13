package ru.solidtech.website.service;

import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Videocard;

import java.io.IOException;
import java.util.List;

public interface VideocardService {

    List<Videocard> findAllVideocards();

    Videocard findVideocardById(Long id);

    Videocard createVideocard(Videocard videocard);

    Videocard updateVideocard(Videocard videocard);

    void deleteVideocard(Long id);

    String saveImage(Long id, MultipartFile file) throws IOException;;
}
