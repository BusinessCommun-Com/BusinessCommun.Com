package com.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.AdminActivityDto;
import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.ApprovedCompanyTableDto;
import com.backend.dtos.CompanyRequestDto;
import com.backend.dtos.CompanyResponseDto;
import com.backend.dtos.ShortCompanyResponseDto;

import com.backend.dtos.DashboardSummeryDto;

public interface CompanyService {


    ApiResponseWrapper<List<ShortCompanyResponseDto>> getPendingCompanies();

   

    ApiResponseWrapper<List<ShortCompanyResponseDto>> getAllCompanies();

    ApiResponse approveCompany(Long id);

    ApiResponse rejectCompany(Long id);
    
    ApiResponse deleteCompany(Long id);  
    
    ApiResponse restoreCompany(Long id);  

    ApiResponse permanentDelete(Long id); 

    ApiResponseWrapper<DashboardSummeryDto> dashboardSummary();

    ApiResponseWrapper<List<AdminActivityDto>> recentActivities();

    ApiResponseWrapper<CompanyResponseDto> getApprovedCompanyById(Long id);
    ApiResponseWrapper<List<ApprovedCompanyTableDto>> getApprovedCompaniesTable();

    ApiResponseWrapper<List<ShortCompanyResponseDto>> getApprovedCompaniesCards();


    ApiResponseWrapper<String> registerCompany(CompanyRequestDto dto) throws IOException;

    ApiResponseWrapper<List<ShortCompanyResponseDto>> getRejectedCompanies();

    ApiResponseWrapper<List<ShortCompanyResponseDto>> getDeletedCompanies();
    
    ApiResponseWrapper<List<ApprovedCompanyTableDto>> getRejectedCompaniesTable();


    ApiResponseWrapper<CompanyResponseDto> getCompanyDetailsForAdmin(Long id);

    ApiResponseWrapper<List<CompanyResponseDto>> getCompaniesByUserId(Long userId);
}
