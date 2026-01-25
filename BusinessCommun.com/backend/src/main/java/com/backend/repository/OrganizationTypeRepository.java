package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.OrganizationTypeEntity;

public interface OrganizationTypeRepository  extends JpaRepository<OrganizationTypeEntity, Long> {

}
