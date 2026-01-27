package com.backend.controller;

import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.CompanyRequestDto;        
import com.backend.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping("/register")
    public ResponseEntity<?> registerCompany(@RequestBody CompanyRequestDto request) {    
        System.out.println("Registering company: " + request.getName());
        return ResponseEntity.ok(companyService.registerCompany(request));
    }
}
