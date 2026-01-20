package com.backend.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthResponse {
	
	
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String role;
}
