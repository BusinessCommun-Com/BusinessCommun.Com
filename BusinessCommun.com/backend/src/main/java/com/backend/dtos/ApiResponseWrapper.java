package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponseWrapper<T> {
    private String status;
    private String message;
    private T data;

    public ApiResponseWrapper(String status, T data) {
        this.status = status;
        this.data = data;
    }

    public ApiResponseWrapper(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
