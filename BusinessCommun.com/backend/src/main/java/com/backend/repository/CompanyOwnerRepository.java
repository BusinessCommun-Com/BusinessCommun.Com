package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.CompanyOwner;

public interface CompanyOwnerRepository extends JpaRepository<CompanyOwner, Long> {

    Optional<CompanyOwner> findByUserId(Long userId);

}
