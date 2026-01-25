package com.backend.service;

import java.util.List;

import com.backend.dtos.AdminActivityDto;
import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.CompanyRequestDto;
import com.backend.dtos.CompanyResponseDto;

import com.backend.dtos.DashboardSummeryDto;
import com.backend.entities.CompanyEntity;

public interface CompanyService {

	ApiResponse registerCompany(CompanyRequestDto dto);

    ApiResponseWrapper<List<CompanyResponseDto>> getPendingCompanies();

    ApiResponseWrapper<List<CompanyResponseDto>> getApprovedCompanies();

    ApiResponseWrapper<List<CompanyResponseDto>> getAllCompanies();

    ApiResponse approveCompany(Long id);

    ApiResponse rejectCompany(Long id);

    ApiResponseWrapper<DashboardSummeryDto> dashboardSummary();

    ApiResponseWrapper<List<AdminActivityDto>> recentActivities();
}
