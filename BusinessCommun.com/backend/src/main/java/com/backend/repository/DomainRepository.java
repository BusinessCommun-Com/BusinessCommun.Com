package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.DomainEntity;

public interface DomainRepository extends JpaRepository<DomainEntity, Long>{

}
