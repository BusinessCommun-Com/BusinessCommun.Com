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
	 
	private final com.backend.service.FileServiceImpl fileService;

 	 //Company Registration
	    @PostMapping(value = "/register", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
		public ResponseEntity<?> registerCompany(
				@org.springframework.web.bind.annotation.RequestPart("data") String companyData,
				@org.springframework.web.bind.annotation.RequestParam(value = "logo", required = false) org.springframework.web.multipart.MultipartFile logo,
				@org.springframework.web.bind.annotation.RequestParam(value = "productImages", required = false) org.springframework.web.multipart.MultipartFile[] productImages
		) throws IOException {
			
			com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
			CompanyRequestDto dto = mapper.readValue(companyData, CompanyRequestDto.class);

			// Save Logo
			if(logo != null && !logo.isEmpty()){
				String logoPath = fileService.saveFile(logo, "logos");
				dto.setLogoUrl(logoPath);
			}

			// Save Product Images
			if(productImages != null && productImages.length > 0){
				java.util.List<String> urls = new java.util.ArrayList<>();
				for(org.springframework.web.multipart.MultipartFile file : productImages){
					 String path = fileService.saveFile(file, "product_images");
					 urls.add(path);
				}
				dto.setProductImageUrls(urls);
			}

			return ResponseEntity.status(HttpStatus.CREATED).body(companyService.registerCompany(dto));
		}

	    //Homepage API
	    @GetMapping("/approved")
		public ResponseEntity<?> approvedCompanies() {
			return ResponseEntity.ok(companyService.getApprovedCompaniesCards());
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

		@PutMapping(value = "/update/{id}", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
		public ResponseEntity<?> updateCompany(
				@PathVariable Long id, 
				@org.springframework.web.bind.annotation.RequestPart("data") String companyData,
				@org.springframework.web.bind.annotation.RequestParam(value = "logo", required = false) org.springframework.web.multipart.MultipartFile logo,
				@org.springframework.web.bind.annotation.RequestParam(value = "productImages", required = false) org.springframework.web.multipart.MultipartFile[] productImages
		) throws IOException {
			com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
			CompanyRequestDto dto = mapper.readValue(companyData, CompanyRequestDto.class);

			// Save Logo if provided
			if(logo != null && !logo.isEmpty()){
				String logoPath = fileService.saveFile(logo, "logos");
				dto.setLogoUrl(logoPath);
			}

			// Save New Product Images if provided
			if(productImages != null && productImages.length > 0){
				java.util.List<String> urls = new java.util.ArrayList<>();
				for(org.springframework.web.multipart.MultipartFile file : productImages){
					 String path = fileService.saveFile(file, "product_images");
					 urls.add(path);
				}
				// We append these to whatever is in the DTO (if frontend sent existing ones)
				if(dto.getProductImageUrls() == null) dto.setProductImageUrls(new java.util.ArrayList<>());
				dto.getProductImageUrls().addAll(urls);
			}

			return ResponseEntity.ok(companyService.updateCompany(id, dto));
		}

		@DeleteMapping("/delete/{id}")
		public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
			return ResponseEntity.ok(companyService.permanentDelete(id));
		}

		
}
