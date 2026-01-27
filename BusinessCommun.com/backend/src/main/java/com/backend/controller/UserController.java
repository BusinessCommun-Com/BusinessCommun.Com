package com.backend.controller;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResponse;
import com.backend.dtos.UserRegistration;
import com.backend.service.UserService;
import com.backend.security.JWTUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@Validated
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JWTUtils jwtUtils;

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
		System.out.println("principal " + fullyAuthenticated.getPrincipal());
		return ResponseEntity.ok(new ApiResponseWrapper<>("success", "Login SuccessFully",  new AuthResponse("Login successful", jwtUtils.generateToken(fullyAuthenticated))));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegistration dto) {
		System.out.println("in register" + dto);
		return ResponseEntity.ok(userService.registerUser(dto));
	}

}
