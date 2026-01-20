package com.backend.custom_exception;

public class AuthenticationException extends RuntimeException {
	public AuthenticationException(String msg) {
		super(msg);
	}

}
