package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResponse;
import com.backend.dtos.UserRegistration;
import com.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@Validated
@RequiredArgsConstructor
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid AuthRequest dto ){
		
		System.out.println("in login " + dto);
		return ResponseEntity.ok(userService.authenticateUser(dto));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegistration dto){
		System.out.println("in register" + dto);
		return ResponseEntity.ok(userService.registerUser(dto));
	}
	

}
