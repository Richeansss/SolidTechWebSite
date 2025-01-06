package ru.solidtech.website.service;

import ru.solidtech.website.model.Chipset;

import java.util.List;

public interface ChipsetService {
    /**
     * Получить список всех чипсетов.
     *
     * @return Список чипсетов.
     */
    List<Chipset> findAllChipsets();

    /**
     * Найти чипсет по его ID.
     *
     * @param id Идентификатор чипсета.
     * @return Найденный чипсет.
     * @throws IllegalArgumentException если чипсет не найден.
     */
    Chipset findChipsetById(Long id);

    /**
     * Создать новый чипсет.
     *
     * @param chipset Новый объект чипсета.
     * @return Сохраненный чипсет.
     */
    Chipset createChipset(Chipset chipset);

    /**
     * Обновить существующий чипсет.
     *
     * @param chipset Объект чипсета с обновленными данными.
     * @return Обновленный чипсет.
     * @throws IllegalArgumentException если чипсет не найден.
     */
    Chipset updateChipset(Chipset chipset);

    /**
     * Удалить чипсет по ID.
     *
     * @param id Идентификатор чипсета.
     * @throws IllegalArgumentException если чипсет не найден.
     */
    void deleteChipset(Long id);
}
