package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

	private final CompanyService companyService;

    @GetMapping("/summary")
    public ResponseEntity<?> summary() {
        return ResponseEntity.ok(companyService.dashboardSummary());
    }

    @GetMapping("/activity")
    public ResponseEntity<?> activity() {
        return ResponseEntity.ok(companyService.recentActivities());
    }
}
