package com.backend.service;

import java.io.IOException;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.custom_exception.ResourceNotFoundException;
import com.backend.dtos.AdminActivityDto;
import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.ApprovedCompanyTableDto;
import com.backend.dtos.CompanyRequestDto;
import com.backend.dtos.CompanyResponseDto;
import com.backend.dtos.ShortCompanyResponseDto;
import com.backend.dtos.DashboardSummeryDto;
import com.backend.entities.AdminActivityLog;
import com.backend.entities.CompanyEntity;
import com.backend.entities.CompanyOwner;
import com.backend.entities.CompanyStatus;
import com.backend.entities.DomainEntity;
import com.backend.entities.OrganizationTypeEntity;
import com.backend.entities.PitchEntity;
import com.backend.entities.UserEntity;
import com.backend.entities.UserRole;
import com.backend.repository.ActivityLogRepository;
import com.backend.repository.CompanyOwnerRepository;
import com.backend.repository.CompanyRepository;
import com.backend.repository.DomainRepository;
import com.backend.repository.OrganizationTypeRepository;
import com.backend.repository.UserRepository;

import com.backend.entities.InvestorConnectEntity;
import com.backend.entities.PartnerConnectEntity;
import com.backend.repository.InvestorConnectRepository;
import com.backend.repository.PartnerConnectRepository;
import com.backend.security.JWTUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

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
    
    // New Repositories
    private final InvestorConnectRepository investorRepo;
    private final PartnerConnectRepository partnerRepo;

    private final ModelMapper mapper;
    private final JWTUtils jwtUtils;
    
    
    
    //Log Activity
    private void logActivity(String msg, CompanyStatus action) {
        AdminActivityLog log = new AdminActivityLog();
        log.setMessage(msg);
        log.setAction(action);
        activityRepo.save(log);
    }

    // Entity to DTO 
    private ShortCompanyResponseDto toShortDTO(CompanyEntity c) {
        ShortCompanyResponseDto dto = new ShortCompanyResponseDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setLogoUrl(c.getLogoUrl());
        dto.setCity(c.getCity());
        dto.setState(c.getState());
        if (c.getPitch() != null) {
            dto.setPitch(c.getPitch().getTitle());
        }
        return dto;
    }

    //Register Company
    @Override
    public ApiResponseWrapper<String> registerCompany(CompanyRequestDto dto) throws IOException {

        UserEntity user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        //Upgrade user role to OWNER
        user.setRole(UserRole.ROLE_OWNER);
        userRepo.save(user);

        DomainEntity domain = domainRepo.findById(dto.getDomainId())
                .orElseThrow(() -> new ResourceNotFoundException("Domain not found"));

        OrganizationTypeEntity orgType = orgRepo.findById(dto.getOrgTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("OrgType not found"));

        // CompanyOwner creation
        CompanyOwner owner = ownerRepo.findByUserId(user.getId())
                .orElseGet(() -> {
                    CompanyOwner newOwner = mapper.map(dto, CompanyOwner.class);
                    newOwner.setUser(user);
                    newOwner = ownerRepo.save(newOwner);
                    return newOwner;
                });

        // DTO to Company Entity
        CompanyEntity company = mapper.map(dto, CompanyEntity.class);
        company.setDomain(domain);
        company.setOrganizationType(orgType);
        company.setCompanyOwner(owner);
        company.setUser(user);
        company.setStatus(CompanyStatus.PENDING);

        //Pitch creation
        PitchEntity pitch = new PitchEntity();

//        pitch.setTitle(dto.getName());

        pitch.setTitle(dto.getTitle());

        pitch.setDescription(dto.getDescription());
        pitch.setProductImage(dto.getProductImage());
        pitch.setWebsite(dto.getWebsite());

        pitch.setCompany(company);
        company.setPitch(pitch);

        company = companyRepo.save(company);

        // Handle Partner/Investor Connect
        if ("partner".equalsIgnoreCase(dto.getConnectType())) {
            PartnerConnectEntity partner = new PartnerConnectEntity();
            partner.setCompany(company);
            partner.setRequirement(dto.getRequirement());
            partner.setMinimumQualification(dto.getMinimumQualification());
            partner.setSkills(dto.getSkills());
            partner.setEquityPercentage(dto.getEquityPercentage());
            partnerRepo.save(partner);
        } else if ("investor".equalsIgnoreCase(dto.getConnectType())) {
            InvestorConnectEntity investor = new InvestorConnectEntity();
            investor.setCompany(company);
            investor.setRequirement(dto.getRequirement());
            investor.setMinimumQualification(dto.getMinimumQualification());
            investor.setSkills(dto.getSkills());
            investor.setInvestmentRange(dto.getInvestmentRange());
            investor.setEquityPercentage(dto.getEquityPercentage());
            investorRepo.save(investor);
        }

        logActivity("Startup " + company.getName() + " submitted a request",
                CompanyStatus.PENDING);

        // Generate new Token with ROLE_OWNER
        String newToken = jwtUtils.generateToken(new UsernamePasswordAuthenticationToken(
                user, null, List.of(new SimpleGrantedAuthority(user.getRole().name()))));

        return new ApiResponseWrapper<>("success", "Company Registered & sent for approval", newToken);
    }

    @Override
    public ApiResponseWrapper<String> updateCompany(Long id, CompanyRequestDto dto) throws IOException {
        CompanyEntity company = companyRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        // Update Basic Info
        company.setAddress(dto.getAddress());
        company.setCity(dto.getCity());
        company.setState(dto.getState());
        company.setRevenue(dto.getRevenue());
        company.setEstablishmentYear(dto.getEstablishmentYear());

        // Update Domain/OrgType if provided
        if(dto.getDomainId() != null) {
             company.setDomain(domainRepo.findById(dto.getDomainId())
                .orElseThrow(() -> new ResourceNotFoundException("Domain not found")));
        }
        if(dto.getOrgTypeId() != null) {
            company.setOrganizationType(orgRepo.findById(dto.getOrgTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("OrgType not found")));
        }

        // Update Pitch
        if (company.getPitch() != null) {
            PitchEntity pitch = company.getPitch();
            pitch.setTitle(dto.getTitle());
            pitch.setDescription(dto.getDescription());
            pitch.setProductImage(dto.getProductImage());
            pitch.setWebsite(dto.getWebsite());
        }

        // Update Connect Info
        // Try to find existing PartnerConnect
        partnerRepo.findFirstByCompanyId(id).ifPresentOrElse(partner -> {
            // It's a Partner connect
            partner.setRequirement(dto.getRequirement());
            partner.setMinimumQualification(dto.getMinimumQualification());
            partner.setSkills(dto.getSkills());
            partner.setEquityPercentage(dto.getEquityPercentage());
            partnerRepo.save(partner);
        }, () -> {
            // Try Investor
            investorRepo.findFirstByCompanyId(id).ifPresent(investor -> {
                investor.setRequirement(dto.getRequirement());
                investor.setMinimumQualification(dto.getMinimumQualification());
                investor.setSkills(dto.getSkills());
                investor.setInvestmentRange(dto.getInvestmentRange());
                investor.setEquityPercentage(dto.getEquityPercentage());
                investorRepo.save(investor);
            });
        });
        
        companyRepo.save(company);
        logActivity("Company " + company.getName() + " updated their details", CompanyStatus.APPROVED);

        return new ApiResponseWrapper<>("success", "Company Details Updated Successfully", null);
    }

    ShortCompanyResponseDto toDTO(CompanyEntity entity) {
        ShortCompanyResponseDto dto = mapper.map(entity, ShortCompanyResponseDto.class);
        dto.setPitch(entity.getPitch().getTitle());
        return dto;
    }
    
    //Approved companies card
    @Override
    public ApiResponseWrapper<List<ShortCompanyResponseDto>> getApprovedCompaniesCards() {

        List<ShortCompanyResponseDto> list =
                companyRepo.findApprovedCompaniesCards(CompanyStatus.APPROVED);

        return new ApiResponseWrapper<>(
                "success",
                "Approved companies for cards fetched successfully",
                list
        );
    }


    //Pending Companies
    @Override
    public ApiResponseWrapper<List<ShortCompanyResponseDto>> getPendingCompanies() {
        List<ShortCompanyResponseDto> list =
                companyRepo.findByStatus(CompanyStatus.PENDING)
                        .stream().map(this::toShortDTO).toList();
        return new ApiResponseWrapper<>("success", "Pending requests fetched", list);
    }

    //Approved Companies list in Admin
    @Override
    public ApiResponseWrapper<List<ApprovedCompanyTableDto>> getApprovedCompaniesTable() {

        List<ApprovedCompanyTableDto> list =
                companyRepo.findCompaniesTableByStatus(CompanyStatus.APPROVED);

        return new ApiResponseWrapper<>(
                "success",
                "Approved companies table fetched successfully",
                list
        );
    }

    //All Companies list
    @Override
    public ApiResponseWrapper<List<ShortCompanyResponseDto>> getAllCompanies() {
        List<ShortCompanyResponseDto> list =
                companyRepo.findAll()
                        .stream().map(this::toShortDTO).toList();
        return new ApiResponseWrapper<>("success", "All companies fetched", list);
    }
    
    //Rejected Companies list
    @Override
    public ApiResponseWrapper<List<ShortCompanyResponseDto>> getRejectedCompanies() {

        List<ShortCompanyResponseDto> list =
                companyRepo.findByStatus(CompanyStatus.REJECTED)
                        .stream().map(this::toDTO).toList();

        return new ApiResponseWrapper<>("success", "Rejected companies fetched", list);
    }
    
    @Override
    public ApiResponseWrapper<List<ShortCompanyResponseDto>> getDeletedCompanies() {

        List<ShortCompanyResponseDto> list =
                companyRepo.findByStatus(CompanyStatus.DELETED)
                        .stream().map(this::toDTO).toList();

        return new ApiResponseWrapper<>("success", "Deleted companies fetched", list);
    }

    //Approve Company
    @Override
    public ApiResponse approveCompany(Long id) {

        CompanyEntity c = companyRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        c.setStatus(CompanyStatus.APPROVED);
        companyRepo.save(c);

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
    
    //Soft delete companies
    @Override
    public ApiResponse deleteCompany(Long id) {

        CompanyEntity company = companyRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

       
        company.setStatus(CompanyStatus.DELETED);
        companyRepo.save(company);

        logActivity("Admin soft deleted company " + company.getName(),
                CompanyStatus.DELETED);

        return new ApiResponse("Company moved to Deleted state", "success");
    }

    //Restore Deleted Company
    @Override
    public ApiResponse restoreCompany(Long id) {

        CompanyEntity company = companyRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        if (company.getStatus() != CompanyStatus.DELETED) {
            return new ApiResponse("Company is not deleted", "failed");
        }

        company.setStatus(CompanyStatus.PENDING);

        logActivity("Admin restored company " + company.getName(),
                CompanyStatus.PENDING);

        return new ApiResponse("Company restored to Pending approval", "success");
    }
    
    //Permanent Delete (Optional)
    @Override
    public ApiResponse permanentDelete(Long id) {

        CompanyEntity company = companyRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        // Manual Cascade Delete for Connect Entities (Inverse side missing in CompanyEntity)
        investorRepo.findFirstByCompanyId(id).ifPresent(investorRepo::delete);
        partnerRepo.findFirstByCompanyId(id).ifPresent(partnerRepo::delete);

        // Pitch is Cascade.ALL so it deletes automatically
        companyRepo.delete(company);

        logActivity("Admin permanently deleted company " + company.getName(),
                CompanyStatus.DELETED);

        return new ApiResponse("Company permanently removed", "success");
    }


    //Dashboard Summary
    @Override
    public ApiResponseWrapper<DashboardSummeryDto> dashboardSummary() {

        DashboardSummeryDto dto = new DashboardSummeryDto(
                companyRepo.findByStatusNot(CompanyStatus.DELETED).size(),

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

 public ApiResponseWrapper<CompanyResponseDto> getApprovedCompanyById(Long id) {

    CompanyEntity company = companyRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

    CompanyResponseDto dto = new CompanyResponseDto();

    // Company fields
    dto.setName(company.getName());
    dto.setEstablishmentYear(company.getEstablishmentYear());
    dto.setGstNo(company.getGstNo());
    dto.setRevenue(company.getRevenue());
    dto.setAddress(company.getAddress());
    dto.setCity(company.getCity());
    dto.setState(company.getState());
    dto.setLogoUrl(company.getLogoUrl());
    dto.setDomain(company.getDomain().getName());
    dto.setOrgType(company.getOrganizationType().getName());

    // Owner fields
    if (company.getCompanyOwner() != null) {
        dto.setOwnerName(company.getCompanyOwner().getOwnerName());
        dto.setMobileNumber(company.getCompanyOwner().getMobileNumber());
    }

    // Pitch fields
    if (company.getPitch() != null) {
        dto.setTitle(company.getPitch().getTitle());
        dto.setDescription(company.getPitch().getDescription());
        dto.setProductImage(company.getPitch().getProductImage());
        dto.setWebsite(company.getPitch().getWebsite());
    }

    return new ApiResponseWrapper<>("success", "Company fetched successfully", dto);
}


 @Override
 public ApiResponseWrapper<List<ApprovedCompanyTableDto>> getRejectedCompaniesTable() {

     List<ApprovedCompanyTableDto> list =
             companyRepo.findCompaniesTableByStatus(CompanyStatus.REJECTED);

     return new ApiResponseWrapper<>(
             "success",
             "Rejected companies fetched successfully",
             list
     );
 }


    @Override
    public ApiResponseWrapper<List<CompanyResponseDto>> getCompaniesByUserId(Long userId) {
        List<CompanyEntity> companies = companyRepo.findByUserId(userId);
        
        if (companies.isEmpty()) {
            throw new ResourceNotFoundException("No companies found for this user");
        }

        List<CompanyResponseDto> dtoList = new java.util.ArrayList<>();
        
        for (CompanyEntity company : companies) {
            CompanyResponseDto dto = new CompanyResponseDto();
            dto.setId(company.getId());
            dto.setName(company.getName());
            dto.setEstablishmentYear(company.getEstablishmentYear());
            dto.setGstNo(company.getGstNo());
            dto.setRevenue(company.getRevenue());
            dto.setAddress(company.getAddress());
            dto.setCity(company.getCity());
            dto.setState(company.getState());
            dto.setLogoUrl(company.getLogoUrl());
            dto.setDomain(company.getDomain().getName());
            dto.setOrgType(company.getOrganizationType().getName());

            if (company.getCompanyOwner() != null) {
                dto.setOwnerName(company.getCompanyOwner().getOwnerName());
                dto.setMobileNumber(company.getCompanyOwner().getMobileNumber());
            }

            if (company.getPitch() != null) {
                dto.setTitle(company.getPitch().getTitle());
                dto.setDescription(company.getPitch().getDescription());
                dto.setProductImage(company.getPitch().getProductImage());
                dto.setWebsite(company.getPitch().getWebsite());
            }

            // Connect Info - Check for Investor or Partner
            investorRepo.findFirstByCompanyId(company.getId()).ifPresent(investor -> {
                dto.setConnectType("INVESTOR");
                dto.setRequirement(investor.getRequirement());
                dto.setSkills(investor.getSkills());
                dto.setEquityPercentage(investor.getEquityPercentage());
                dto.setInvestmentRange(investor.getInvestmentRange());
                dto.setMinimumQualification(investor.getMinimumQualification());
            });

            partnerRepo.findFirstByCompanyId(company.getId()).ifPresent(partner -> {
                dto.setConnectType("PARTNER");
                dto.setRequirement(partner.getRequirement());
                dto.setSkills(partner.getSkills());
                dto.setEquityPercentage(partner.getEquityPercentage());
                dto.setMinimumQualification(partner.getMinimumQualification());
            });
            
            dtoList.add(dto);
        }

        return new ApiResponseWrapper<>("success", "Companies fetched successfully", dtoList);
    }

    

    
    
    
    
}
