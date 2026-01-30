package com.backend.repository;

import com.backend.entities.PartnerConnectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerConnectRepository extends JpaRepository<PartnerConnectEntity, Long> {
    java.util.Optional<PartnerConnectEntity> findFirstByCompanyId(Long companyId);
}
