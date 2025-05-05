package ru.solidtech.website.service;

import org.springframework.web.multipart.MultipartFile;
import ru.solidtech.website.model.Case;

import java.io.IOException;
import java.util.List;

public interface CaseService {
    List<Case> findAllCases();
    Case findCaseById(Long id);
    Case createCase(Case caseEntity);
    Case updateCase(Case caseEntity);
    void deleteCase(Long id);
    String saveImage(Long id, MultipartFile file) throws IOException;

}
