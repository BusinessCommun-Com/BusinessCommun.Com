package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardSummeryDto {

	 private long totalCompanies;
	    private long pending;
	    private long approved;
	    private long rejected;
}
