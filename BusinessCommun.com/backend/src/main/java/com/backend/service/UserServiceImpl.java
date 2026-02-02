package com.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.dtos.ApiResponse;
import com.backend.dtos.ApiResponseWrapper;
import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResponse;
import com.backend.dtos.JWTDTO;
import com.backend.dtos.SubscriptionServiceResponseDto;
import com.backend.dtos.UserRegistration;
import com.backend.entities.UserEntity;
import com.backend.entities.UserRole;
import com.backend.logger.KafkaLogger;
import com.backend.repository.UserRepository;
import com.backend.security.JWTUtils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;
	
	private final AuthenticationManager authenticationManager;

	@Autowired
	private JWTUtils jwtUtils;



	@Override
	public ApiResponse registerUser(UserRegistration dto) {
		UserEntity entity = modelMapper.map(dto, UserEntity.class);
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		entity.setRole(UserRole.ROLE_USER);
		System.out.println("mapped entity " + entity);
		UserEntity persistentEntity = userRepository.save(entity);
		
		KafkaLogger.log("User created: " + persistentEntity.getEmail());

		return new ApiResponse("New User Registered with id: " + persistentEntity.getId(), "success");
	}
	// @Override
	// public ApiResponseWrapper<AuthResponse> authenticateUser(AuthRequest dto) {

	//     UserEntity user = userRepository
	//             .findByEmailAndPassword(dto.getEmail(), dto.getPassword())
	//             .orElseThrow(() -> new AuthenticationException("Invalid Email or Password"));

	//     AuthResponse resp = modelMapper.map(user, AuthResponse.class);

	//     return new ApiResponseWrapper(null, null, null)<>("success", "Login Successful", resp);
	// }
	
	@Override
	public ApiResponseWrapper<AuthResponse> authenticateUser(AuthRequest dto) {

	    Authentication authentication =
	            authenticationManager.authenticate(
	                    new UsernamePasswordAuthenticationToken(
	                            dto.getEmail(),
	                            dto.getPassword()
	                    )
	            );

	    String token = jwtUtils.generateToken(authentication);

	    AuthResponse resp = new AuthResponse("Login Successful", token);

	    return new ApiResponseWrapper<>("success", "Login Successful", resp);
	}

	@Override
	public SubscriptionServiceResponseDto getIdAndEmail(JWTDTO jwtDto) {
		SubscriptionServiceResponseDto dto = userRepository.findById(jwtDto.getUserId())
				.map(user -> {
					SubscriptionServiceResponseDto responseDto = new SubscriptionServiceResponseDto();
					responseDto.setId(user.getId());
					responseDto.setEmail(user.getEmail());
					responseDto.setName(user.getFirstName() + " " + user.getLastName());
					return responseDto;
				})
				.orElseThrow(() -> new RuntimeException("User not found with id: " + jwtDto.getUserId()));

		return dto;
	}




}
