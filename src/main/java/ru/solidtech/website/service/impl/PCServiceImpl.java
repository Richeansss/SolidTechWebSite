package ru.solidtech.website.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import ru.solidtech.website.model.PC;
import ru.solidtech.website.repository.*;
import ru.solidtech.website.service.PCService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PCServiceImpl implements PCService {
    private final PCRepository pcRepository;
    private final MotherBoardRepository motherBoardRepository;
    private final ProcessorRepository processorRepository;
    private final RamRepository ramRepository;
    private final CoolerRepository coolerRepository;
    private final CaseRepository caseRepository;
    private final VideocardRepository videocardRepository;
    private final StorageDeviceRepository storageDeviceRepository;
    private final PowerSupplyRepository powerSupplyRepository;

    @Override
    public List<PC> findAllPCs() {
        return pcRepository.findAll();
    }

    @Override
    public PC findPCById(Long id) {
        return pcRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ПК с ID " + id + " не найден"));
    }

    @Override
    public PC createPC(PC pcEntity) {
        pcEntity.setMotherBoard(getEntityById(pcEntity.getMotherBoard().getId(), motherBoardRepository, "Материнская плата"));
        pcEntity.setProcessor(getEntityById(pcEntity.getProcessor().getId(), processorRepository, "Процессор"));
        pcEntity.setRam(getEntityById(pcEntity.getRam().getId(), ramRepository, "ОЗУ"));
        pcEntity.setCooler(getEntityById(pcEntity.getCooler().getId(), coolerRepository, "Кулер"));
        pcEntity.setCase_pc(getEntityById(pcEntity.getCase_pc().getId(), caseRepository, "Корпус"));
        pcEntity.setVideocard(getEntityById(pcEntity.getVideocard().getId(), videocardRepository, "Видеокарта"));
        pcEntity.setStorageDevice(getEntityById(pcEntity.getStorageDevice().getId(), storageDeviceRepository, "Накопитель"));
        pcEntity.setPowerSupply(getEntityById(pcEntity.getPowerSupply().getId(), powerSupplyRepository, "Блок питания"));

        return pcRepository.save(pcEntity);
    }

    private <T> T getEntityById(Long id, JpaRepository<T, Long> repository, String entityName) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(entityName + " с ID " + id + " не найден"));
    }

    @Override
    public PC updatePC(PC pc) {
        if (!pcRepository.existsById(pc.getId())) {
            throw new IllegalArgumentException("ПК с ID " + pc.getId() + " не найден");
        }
        return pcRepository.save(pc);
    }

    @Override
    public void deletePC(Long id) {
        if (!pcRepository.existsById(id)) {
            throw new IllegalArgumentException("ПК с ID " + id + " не найден");
        }
        pcRepository.deleteById(id);
    }
}
