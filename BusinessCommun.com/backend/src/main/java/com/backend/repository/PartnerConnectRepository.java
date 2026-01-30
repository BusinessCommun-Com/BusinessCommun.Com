package com.backend.repository;

import com.backend.entities.PartnerConnectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PartnerConnectRepository extends JpaRepository<PartnerConnectEntity, Long> {
    Optional<PartnerConnectEntity> findFirstByCompanyId(Long companyId);
}
