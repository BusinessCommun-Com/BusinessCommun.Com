package com.backend.repository;

import com.backend.entities.InvestorConnectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvestorConnectRepository extends JpaRepository<InvestorConnectEntity, Long> {
    java.util.Optional<InvestorConnectEntity> findFirstByCompanyId(Long companyId);
}
