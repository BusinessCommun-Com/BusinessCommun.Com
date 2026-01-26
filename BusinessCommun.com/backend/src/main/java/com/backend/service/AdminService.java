package com.backend.service;

import java.util.List;

import com.backend.dtos.AdminResponseDto;
import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;

public interface AdminService {

	ApiResponseWrapper<List<AdminResponseDto>> getAllAdmins();

    ApiResponse removeAdmin(Long id);
}
