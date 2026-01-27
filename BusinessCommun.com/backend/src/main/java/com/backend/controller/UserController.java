package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResponse;
import com.backend.dtos.UserRegistration;
import com.backend.entities.UserEntity;
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
	public ResponseEntity<ApiResponseWrapper<AuthResponse>> authenticateUser(@RequestBody @Valid AuthRequest dto) {

		System.out.println("in login " + dto);
		Authentication fullyAuthenticated = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						dto.getEmail(),
						dto.getPassword()
				)
			);
		System.out.println("is user authenticated " + fullyAuthenticated.isAuthenticated());
		UserEntity user = (UserEntity) fullyAuthenticated.getPrincipal();
		System.out.println("principal " + user);
		return ResponseEntity.ok(new ApiResponseWrapper<>("success", "Login successful", 
				new AuthResponse("Login successful", jwtUtils.generateToken(fullyAuthenticated), 
						user.getId(), user.getFirstName(), user.getLastName())));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegistration dto) {
		System.out.println("in register" + dto);
		return ResponseEntity.ok(userService.registerUser(dto));
	}

}
