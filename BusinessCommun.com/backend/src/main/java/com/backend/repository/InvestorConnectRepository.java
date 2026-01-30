package com.backend.repository;

import com.backend.entities.InvestorConnectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface InvestorConnectRepository extends JpaRepository<InvestorConnectEntity, Long> {
    Optional<InvestorConnectEntity> findFirstByCompanyId(Long companyId);
}
