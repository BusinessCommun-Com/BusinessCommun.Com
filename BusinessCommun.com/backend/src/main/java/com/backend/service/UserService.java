package com.backend.service;

import com.backend.dtos.ApiResponse;
import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResponse;
import com.backend.dtos.UserRegistration;

import jakarta.validation.Valid;

public interface UserService {

	AuthResponse authenticateUser(AuthRequest dto);

	ApiResponse registerUser(UserRegistration dto);

}
