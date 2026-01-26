package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

	//All Companies (excluding deleted)
    @GetMapping
    public ResponseEntity<?> allCompanies() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    //Pending Companies
    @GetMapping("/pending")
    public ResponseEntity<?> pendingCompanies() {
        return ResponseEntity.ok(companyService.getPendingCompanies());
    }

    //Approved Companies
    @GetMapping("/approved")
    public ResponseEntity<?> approvedCompanies() {
        return ResponseEntity.ok(companyService.getApprovedCompanies());
    }

    //Rejected Companies
    @GetMapping("/rejected")
    public ResponseEntity<?> rejectedCompanies() {
        return ResponseEntity.ok(companyService.getRejectedCompanies());
    }

    //Deleted Companies
    @GetMapping("/deleted")
    public ResponseEntity<?> deletedCompanies() {
        return ResponseEntity.ok(companyService.getDeletedCompanies());
    }

//    //Company Profile View
//    @GetMapping("/{id}")
//    public ResponseEntity<?> profile(@PathVariable Long id) {
//        return ResponseEntity.ok(companyService.getCompanyProfile(id));
//    }

    //Approve
    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.approveCompany(id));
    }

    //Reject
    @PutMapping("/reject/{id}")
    public ResponseEntity<?> reject(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.rejectCompany(id));
    }

    //Soft Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDelete(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.deleteCompany(id));
    }

    // ✅ Restore Company
    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restore(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.restoreCompany(id));
    }

    // ✅ Permanent Delete (Optional)
    @DeleteMapping("/permanent/{id}")
    public ResponseEntity<?> permanent(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.permanentDelete(id));
    }
}
