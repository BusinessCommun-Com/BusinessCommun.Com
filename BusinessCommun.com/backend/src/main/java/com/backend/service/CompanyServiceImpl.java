package com.backend.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.custom_exception.ResourceNotFoundException;
import com.backend.dtos.AdminActivityDto;
import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.CompanyRequestDto;
import com.backend.dtos.CompanyResponseDto;
import com.backend.dtos.DashboardSummeryDto;
import com.backend.entities.AdminActivityLog;
import com.backend.entities.CompanyEntity;
import com.backend.entities.CompanyOwner;
import com.backend.entities.CompanyStatus;
import com.backend.entities.DomainEntity;
import com.backend.entities.OrganizationTypeEntity;
import com.backend.entities.PitchEntity;
import com.backend.entities.UserEntity;
import com.backend.repository.ActivityLogRepository;
import com.backend.repository.CompanyOwnerRepository;
import com.backend.repository.CompanyRepository;
import com.backend.repository.DomainRepository;
import com.backend.repository.OrganizationTypeRepository;
import com.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService{
	
	private final CompanyRepository companyRepo;
    private final CompanyOwnerRepository ownerRepo;
    private final ActivityLogRepository activityRepo;

    private final DomainRepository domainRepo;
    private final OrganizationTypeRepository orgRepo;
    private final UserRepository userRepo;

    private final ModelMapper mapper;
    
    
    
    //Log Activity
    private void logActivity(String msg, CompanyStatus action) {
        activityRepo.save(new AdminActivityLog(msg, action));
    }

    // Entity to DTO 
    private CompanyResponseDto toDTO(CompanyEntity c) {

        CompanyResponseDto dto = mapper.map(c, CompanyResponseDto.class);

        dto.setDomainName(c.getDomain().getName());
        dto.setStatus(c.getStatus().name());

        return dto;
    }

    //Register Company
    @Override
    public ApiResponse registerCompany(CompanyRequestDto dto) {

        UserEntity user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        DomainEntity domain = domainRepo.findById(dto.getDomainId())
                .orElseThrow(() -> new ResourceNotFoundException("Domain not found"));

        OrganizationTypeEntity orgType = orgRepo.findById(dto.getOrgTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("OrgType not found"));

        // CompanyOwner creation
        CompanyOwner owner = ownerRepo.findByUserId(user.getId())
                .orElseGet(() -> {
                    CompanyOwner newOwner = mapper.map(dto, CompanyOwner.class);
                    newOwner.setUser(user);
                    return ownerRepo.save(newOwner);
                });

        // DTO to Company Entity
        CompanyEntity company = mapper.map(dto, CompanyEntity.class);
        company.setDomain(domain);
        company.setOrganizationType(orgType);
        company.setCompanyOwner(owner);
        company.setStatus(CompanyStatus.PENDING);

        //Pitch creation
        PitchEntity pitch = new PitchEntity();
        pitch.setDescription(dto.getDescription());
        pitch.setProductImage(dto.getProductImage());
        pitch.setWebsite(dto.getWebsite());

        pitch.setCompany(company);
        company.setPitch(pitch);

        companyRepo.save(company);

        logActivity("Startup " + company.getName() + " submitted a request",
                CompanyStatus.PENDING);

        return new ApiResponse("Company Registered & sent for approval", "success");
    }

    //Pending Companies
    @Override
    public ApiResponseWrapper<List<CompanyResponseDto>> getPendingCompanies() {

        List<CompanyResponseDto> list =
                companyRepo.findByStatus(CompanyStatus.PENDING)
                        .stream().map(this::toDTO).toList();

        return new ApiResponseWrapper<>("success", "Pending requests fetched", list);
    }

    //Approved Companies
    @Override
    public ApiResponseWrapper<List<CompanyResponseDto>> getApprovedCompanies() {

        List<CompanyResponseDto> list =
                companyRepo.findByStatus(CompanyStatus.APPROVED)
                        .stream().map(this::toDTO).toList();

        return new ApiResponseWrapper<>("success", "Approved companies fetched", list);
    }

    //All Companies
    @Override
    public ApiResponseWrapper<List<CompanyResponseDto>> getAllCompanies() {

        List<CompanyResponseDto> list =
                companyRepo.findAll()
                        .stream().map(this::toDTO).toList();

        return new ApiResponseWrapper<>("success", "All companies fetched", list);
    }

    //Approve Company
    @Override
    public ApiResponse approveCompany(Long id) {

        CompanyEntity c = companyRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        c.setStatus(CompanyStatus.APPROVED);

        logActivity("Admin approved " + c.getName(), CompanyStatus.APPROVED);

        return new ApiResponse("Company Approved Successfully", "success");
    }

    //Reject Company
    @Override
    public ApiResponse rejectCompany(Long id) {

        CompanyEntity c = companyRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        c.setStatus(CompanyStatus.REJECTED);

        logActivity("Admin rejected " + c.getName(), CompanyStatus.REJECTED);

        return new ApiResponse("Company Rejected Successfully", "success");
    }

    //Dashboard Summary
    @Override
    public ApiResponseWrapper<DashboardSummeryDto> dashboardSummary() {

        DashboardSummeryDto dto = new DashboardSummeryDto(
                companyRepo.count(),
                companyRepo.countByStatus(CompanyStatus.PENDING),
                companyRepo.countByStatus(CompanyStatus.APPROVED),
                companyRepo.countByStatus(CompanyStatus.REJECTED)
        );

        return new ApiResponseWrapper<>("success", "Dashboard loaded", dto);
    }

    //Recent Activities
    @Override
    public ApiResponseWrapper<List<AdminActivityDto>> recentActivities() {

        List<AdminActivityDto> list =
                activityRepo.findTop5ByOrderByCreatedAtDesc(
                		)
                        .stream()
                        .map(a -> new AdminActivityDto(
                                a.getCreatedAt().toString(),
                                a.getMessage(),
                                a.getAction().name()
                        ))
                        .toList();

        return new ApiResponseWrapper<>("success", "Recent activity fetched", list);
    }
    
    
    
    
    
    
    
    
    
    
}
