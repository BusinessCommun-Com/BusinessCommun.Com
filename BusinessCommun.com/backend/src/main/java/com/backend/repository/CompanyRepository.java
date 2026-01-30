package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.dtos.ShortCompanyResponseDto;
import com.backend.entities.CompanyEntity;
import com.backend.entities.CompanyStatus;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Long>  {

	List<CompanyEntity> findByStatus(CompanyStatus status);

    long countByStatus(CompanyStatus status);

    @Query("""
    SELECT new com.backend.dtos.ShortCompanyResponseDto(
        c.id, c.name, p.title ,c.logoUrl, c.city, c.state
    )
   FROM CompanyEntity c
    JOIN c.domain d
    JOIN c.organizationType o
    LEFT JOIN c.pitch p
    WHERE c.status = :status    
""")
    List<ShortCompanyResponseDto> findApprovedCompanies(@Param("status") CompanyStatus status);

    List<ShortCompanyResponseDto> findByStatusNot(CompanyStatus deleted);

    
    List<CompanyEntity> findByUserId(Long userId);

}
