package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/admins")
@RequiredArgsConstructor
public class AdminManagementController {


    private final AdminService adminService;

    //Get All Admins
    @GetMapping
    public ResponseEntity<?> getAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    //Remove Admin (Role Change)
    @PutMapping("/remove/{id}")
    public ResponseEntity<?> removeAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.removeAdmin(id));
    }
}
