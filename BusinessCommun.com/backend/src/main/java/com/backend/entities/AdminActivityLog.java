package com.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admin_activity_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminActivityLog extends BaseEntity{

	@Column(nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    private CompanyStatus action;
}
