package com.backend.repository;

import com.backend.entities.PitchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PitchRepository extends JpaRepository<PitchEntity, Long> {
}
