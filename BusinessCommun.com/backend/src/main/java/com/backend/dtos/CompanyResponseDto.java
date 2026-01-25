package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CompanyResponseDto {

	private Long id;
    private String name;
    private String domainName;
    private String city;
    private String status;
}
