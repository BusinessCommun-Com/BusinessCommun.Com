package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShortCompanyResponseDto {

	private Long id;
    private String name;
    private String pitch;
    private String logoUrl;
    private String city;
    private String state;
}
