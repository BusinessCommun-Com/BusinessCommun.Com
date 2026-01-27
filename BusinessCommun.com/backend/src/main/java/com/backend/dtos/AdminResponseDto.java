package com.backend.dtos;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminResponseDto {

	private Long id;
    private String name;
    private String email;
}
