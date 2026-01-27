package com.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CompanyEntity extends BaseEntity {

	@Column(nullable = false)
    private String name;  

    @Column(name = "establishment_year")
    private Integer establishmentYear;

    @Column(name = "gst_number", nullable = false, unique = true)
    private String gstNo;

    @Column(name= "annual_revenue",nullable = false)
    private Long revenue;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(name = "logo_url")
    private String logoUrl;
    
    @Enumerated(EnumType.STRING)
    private CompanyStatus status = CompanyStatus.PENDING;
   
    
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private CompanyOwner companyOwner;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "domain_id", nullable = false)
    private DomainEntity domain;

    @ManyToOne
    @JoinColumn(name = "org_type_id", nullable = false)
    private OrganizationTypeEntity organizationType;


    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private PitchEntity pitch;
}
