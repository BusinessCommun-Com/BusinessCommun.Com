package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.UserEntity;
import com.backend.entities.UserRole;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

	Optional<UserEntity> findByEmailAndPassword(String email, String password);

	Optional<UserEntity> findByEmail(String email);
	
	List<UserEntity> findByRole(UserRole role);

}
