package com.backend.service;

import com.backend.dtos.ApiResponse;
import com.backend.dtos.UserRegistration;

public interface UserService {

	 ApiResponseWrapper<AuthResponse> authenticateUser(AuthRequest dto);
	ApiResponse registerUser(UserRegistration dto);

}
