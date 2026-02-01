package com.backend.controller;

import java.io.IOException;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.CompanyRequestDto;
import com.backend.dtos.JWTDTO;
import com.backend.service.CompanyService;
import org.springframework.security.core.Authentication;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;
	 
	 public static String uploadDir = System.getProperty("user.dir") + "/src/main/webapp/logos";

	 //Company Registration
	    @PostMapping("/register")
		public ResponseEntity<?> registerCompany(@RequestBody CompanyRequestDto dto) throws IOException {
				return ResponseEntity.status(HttpStatus.CREATED).body(companyService.registerCompany(dto));
		}

	    //Homepage API
	    @GetMapping("/approved")
		public ResponseEntity<?> approvedCompanies() {
			return ResponseEntity.ok(companyService.getApprovedCompanies());
		}

		@GetMapping("/approved/{id}")
		public ResponseEntity<?> approvedCompanyById(@PathVariable Long id) {
			return ResponseEntity.ok(companyService.getApprovedCompanyById(id));
		}

		@GetMapping("/my-company")
		public ResponseEntity<?> getMyCompanies(Authentication authentication) {
			JWTDTO user = (JWTDTO) authentication.getPrincipal();
			return ResponseEntity.ok(companyService.getCompaniesByUserId(user.getUserId()));
		}

		@PutMapping("/update/{id}")
		public ResponseEntity<?> updateCompany(@PathVariable Long id, @RequestBody CompanyRequestDto dto) throws IOException {
			return ResponseEntity.ok(companyService.updateCompany(id, dto));
		}

		@DeleteMapping("/delete/{id}")
		public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
			return ResponseEntity.ok(companyService.permanentDelete(id));
		}

		
}
