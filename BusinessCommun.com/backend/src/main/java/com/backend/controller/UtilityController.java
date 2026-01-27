package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ApiResponseWrapper;
import com.backend.repository.DomainRepository;
import com.backend.repository.OrganizationTypeRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/utils")
@RequiredArgsConstructor
public class UtilityController {

    private final DomainRepository domainRepo;
    private final OrganizationTypeRepository orgRepo;

    @GetMapping("/domains")
    public ResponseEntity<ApiResponseWrapper<?>> getAllDomains() {
        return ResponseEntity.ok(new ApiResponseWrapper<>("success", domainRepo.findAll()));
    }

    @GetMapping("/org-types")
    public ResponseEntity<ApiResponseWrapper<?>> getAllOrgTypes() {
        return ResponseEntity.ok(new ApiResponseWrapper<>("success", orgRepo.findAll()));
    }
}
