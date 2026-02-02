package com.backend.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.backend.dtos.JWTDTO;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomJwtFilter extends OncePerRequestFilter {

	private final JWTUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// check if jwt exists in request auth header
		try {
			String headerValue = request.getHeader("Authorization");
			if (headerValue != null && headerValue.startsWith("Bearer ")) {
				String jwt = headerValue.substring(7).trim();
				System.out.println("jwt found : " + jwt);
				Claims claims = jwtUtils.validateToken(jwt);
				// store the claims in dto
				String role = claims.get("role", String.class);
				JWTDTO dto = new JWTDTO(Long.valueOf(claims.getSubject()), claims.get("email", String.class), role);
				// add it in Authenticaion object
				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(dto, null,
						List.of(new SimpleGrantedAuthority(role)));
				// add it under sec ctx holder
				SecurityContextHolder.getContext().setAuthentication(auth);
				System.out.println("add sec ctx");
			}
		} catch (Exception e) {
			System.out.println("JWT validation failed: " + e.getMessage());
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			SecurityContextHolder.clearContext();

		}
		filterChain.doFilter(request, response);

	}

}
