package com.backend.repository;

import com.backend.entities.OrganizationTypeEntity;        
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationTypeRepository extends JpaRepository<OrganizationTypeEntity, Long> {
    
    Optional<OrganizationTypeEntity> findByName(String name);
}
