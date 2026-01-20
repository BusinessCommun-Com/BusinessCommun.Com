package com.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf-> csrf.disable());
		
		http.sessionManagement(sessionConfig-> 
				sessionConfig.sessionCreationPolicy
				(SessionCreationPolicy.STATELESS));
		http.authorizeHttpRequests(request->
			request.requestMatchers("/swagger-ui/**", "/v3/api-docs**",
					"/users/login","/users/register").permitAll().anyRequest().authenticated()
				);
		
		http.httpBasic(Customizer.withDefaults());
		return http.build();
	}

}
