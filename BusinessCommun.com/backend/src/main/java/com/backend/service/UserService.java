package com.backend.service;

import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResponse;
import com.backend.dtos.UserRegistration;

public interface UserService {

	 ApiResponseWrapper<AuthResponse> authenticateUser(AuthRequest dto);
	ApiResponse registerUser(UserRegistration dto);
	ApiResponseWrapper<AuthResponse> updateUser(Long id, UserRegistration dto);
}
