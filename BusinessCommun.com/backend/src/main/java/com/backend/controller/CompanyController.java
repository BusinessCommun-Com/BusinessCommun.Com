package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.CompanyRequestDto;
import com.backend.entities.CompanyEntity;
import com.backend.service.CompanyServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {
	
	 private final CompanyServiceImpl companyService;

	 //Company Registration
	    @PostMapping("/register")
	    public ResponseEntity<ApiResponse> registerCompany(@RequestBody CompanyRequestDto dto) {
	        return ResponseEntity.ok(companyService.registerCompany(dto));
	    }

	    //Homepage API
	    @GetMapping("/approved")
	    public ResponseEntity<?> approvedCompanies() {
	        return ResponseEntity.ok(companyService.getApprovedCompanies());
	    }
}

