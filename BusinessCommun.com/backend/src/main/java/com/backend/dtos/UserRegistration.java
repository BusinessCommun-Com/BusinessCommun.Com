package com.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRegistration {
	
	@NotBlank(message = "first name is required")
	private String firstName;
	@NotBlank(message = "last name is required")
	private String lastName;
	@NotBlank(message = "Email is required!")
	@Email(message = "Invalid Email format !")
	private String email;
	//@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Invalid password format")
	private String password;
	@NotBlank(message = "role is required")
	private String role;

}
