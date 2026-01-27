package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.CompanyEntity;
import com.backend.entities.CompanyStatus;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Long>  {

	List<CompanyEntity> findByStatus(CompanyStatus status);

    long countByStatus(CompanyStatus status);
    
    List<CompanyEntity> findByStatusNot(CompanyStatus status);

    List<CompanyEntity> findAllByStatus(CompanyStatus status);
}
