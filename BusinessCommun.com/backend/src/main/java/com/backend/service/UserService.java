package com.backend.service;

import com.backend.dtos.ApiResponse;
import com.backend.dtos.UserRegistration;

public interface UserService {


	ApiResponse registerUser(UserRegistration dto);

}
