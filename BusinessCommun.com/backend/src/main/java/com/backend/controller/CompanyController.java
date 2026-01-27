package com.backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.ApiResponse;
import com.backend.dtos.CompanyRequestDto;
import com.backend.service.CompanyService;

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

		
}

