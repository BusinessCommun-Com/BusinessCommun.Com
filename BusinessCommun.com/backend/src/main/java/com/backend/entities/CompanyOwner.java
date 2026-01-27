package com.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="company_owners")
@Getter
@Setter
@NoArgsConstructor
public class CompanyOwner extends BaseEntity{

	@Column(nullable = false)
    private String ownerName;

    @Column(nullable = false)
    private String mobileNumber;

   
    @OneToOne
    @JoinColumn(name="user_id", unique=true)
    private UserEntity user;

}
