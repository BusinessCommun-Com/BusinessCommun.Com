package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.AdminActivityLog;

public interface ActivityLogRepository extends JpaRepository<AdminActivityLog, Long> {

    List<AdminActivityLog> findTop5ByOrderByCreatedAtDesc();

}
