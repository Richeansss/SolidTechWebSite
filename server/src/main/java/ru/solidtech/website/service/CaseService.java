package ru.solidtech.website.service;

import ru.solidtech.website.model.Case;

import java.util.List;

public interface CaseService {
    List<Case> findAllCases();
    Case findCaseById(Long id);
    Case createCase(Case caseEntity);
    Case updateCase(Case caseEntity);
    void deleteCase(Long id);
}
