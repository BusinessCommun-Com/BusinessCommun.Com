package com.backend.repository;

import com.backend.entities.CompanyOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyOwnerRepository extends JpaRepository<CompanyOwner, Long> {
    Optional<CompanyOwner> findByUserId(Long userId);
}
