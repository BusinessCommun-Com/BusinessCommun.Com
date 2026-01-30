package com.backend.security;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.backend.entities.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JWTUtils {

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.expiration.time}")
    private long expTime;



    private SecretKey key;
    @PostConstruct
    public void init(){
        key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(Authentication authentication){
    	UserEntity user = (UserEntity) authentication.getPrincipal();
    	String userId = String.valueOf(user.getId());
        return Jwts.builder()
                .subject(userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expTime))
                .claim("email", user.getEmail())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("role", user.getRole().name())
                .signWith(key)
                .compact();

    }

    public Claims validateToken(String token) throws ExpiredJwtException, JwtException {
    	try {
    		return Jwts.parser()
    				.verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
    	} catch (ExpiredJwtException e) {
    		System.out.println("Token expired: " + e.getMessage());
    		throw e;
    	} catch (JwtException e) {
    		System.out.println("JWT parsing error: " + e.getMessage());
    		throw e;
    	}
    }

}
