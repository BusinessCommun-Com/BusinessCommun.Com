package com.backend.security;

import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import com.backend.entities.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
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
    	String roles = user.getAuthorities().stream()
    				.map(authority -> authority.getAuthority())
    				.collect(Collectors.joining(","));
        return Jwts.builder()
                .subject(userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expTime))
                .claims(Map.of("email", user.getEmail(), "role", user.getRole().name(), 
                		"user_id", user.getId()))
                .signWith(key)
                .compact();

    }

    public Claims validateToken(String token) {
    	return Jwts.parser()
    			.verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    			
    }

}
