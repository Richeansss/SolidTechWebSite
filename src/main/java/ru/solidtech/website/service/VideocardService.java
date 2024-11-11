package ru.solidtech.website.service;

import ru.solidtech.website.model.Videocard;

import java.util.List;

public interface VideocardService {

    List<Videocard> findAllVideocards();

    Videocard findVideocardById(Long id);

    Videocard createVideocard(Videocard videocard);

    Videocard updateVideocard(Videocard videocard);

    void deleteVideocard(Long id);
}
