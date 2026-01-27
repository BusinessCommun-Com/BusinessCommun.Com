package com.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "investor_connects")
@Getter
@Setter
@NoArgsConstructor
public class InvestorConnectEntity extends BaseEntity {

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    private CompanyEntity company;

    @Column(name = "requirement", nullable = false, columnDefinition = "TEXT")
    private String requirement;

    @Column(name = "minimum_qualification", nullable = false)
    private String minimumQualification;

    @Column(name = "skills", nullable = false)
    private String skills;

    @Column(name = "investment_range")
    private String investmentRange;

    @Column(name = "equity_percentage", nullable = false)
    private String equityPercentage;
}
