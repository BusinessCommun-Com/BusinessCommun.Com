package com.backend.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.backend.custom_exception.ResourceNotFoundException;
import com.backend.dtos.AdminResponseDto;
import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;
import com.backend.entities.UserEntity;
import com.backend.entities.UserRole;
import com.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final UserRepository userRepo;
    private final ModelMapper mapper;

    //Fetch All Admin Users
    @Override
    public ApiResponseWrapper<List<AdminResponseDto>> getAllAdmins() {

        List<UserEntity> admins = userRepo.findByRole(UserRole.ROLE_ADMIN);

        List<AdminResponseDto> dtoList = admins.stream()
                .map(user -> new AdminResponseDto(
                        user.getId(),
                        user.getFirstName() + " " + user.getLastName(),
                        user.getEmail()
                ))
                .toList();

        return new ApiResponseWrapper<>("success", "Admin list fetched", dtoList);
    }

    //Remove Admin(soft delete)
    @Override
    public ApiResponse removeAdmin(Long id) {

        UserEntity admin = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));

        if (!admin.getRole().equals(UserRole.ROLE_ADMIN)) {
            throw new ResourceNotFoundException("User is not an Admin");
        }

        //convert admin role to user role
        admin.setRole(UserRole.ROLE_USER);

        userRepo.save(admin);

        return new ApiResponse("Admin removed successfully", "success");
    }
}
