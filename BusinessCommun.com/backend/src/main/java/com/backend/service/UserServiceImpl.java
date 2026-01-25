package com.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.custom_exception.AuthenticationException;
import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResponse;
import com.backend.dtos.UserRegistration;
import com.backend.entities.UserEntity;
import com.backend.entities.UserRole;
import com.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;


	@Override
	public ApiResponse registerUser(UserRegistration dto) {
		UserEntity entity = modelMapper.map(dto, UserEntity.class);
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		entity.setRole(UserRole.ROLE_USER);
		System.out.println("mapped entity " + entity);
		UserEntity persistentEntity = userRepository.save(entity);

		return new ApiResponse("New User Registered with id: " + persistentEntity.getId(), "success");
	}

}
