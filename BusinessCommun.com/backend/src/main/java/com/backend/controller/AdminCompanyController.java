package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/companies")
@RequiredArgsConstructor
public class AdminCompanyController {

	private final CompanyService companyService;

    @GetMapping
    public ResponseEntity<?> allCompanies() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @GetMapping("/pending")
    public ResponseEntity<?> pendingCompanies() {
        return ResponseEntity.ok(companyService.getPendingCompanies());
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.approveCompany(id));
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<?> reject(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.rejectCompany(id));
    }
}
