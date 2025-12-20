// src/main/java/com/property/service/AuthService.java
package com.property.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.property.dto.LoginRequest;
import com.property.dto.LoginResponse;
import com.property.dto.SignupRequest;
import com.property.dto.UserResponse;
import com.property.model.Role;
import com.property.model.User;
import com.property.repository.RoleRepository;
import com.property.repository.UserRepository;
import com.property.security.JwtTokenProvider;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Autowired
    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    /**
     * UPDATED LOGIN METHOD
     * Fixes the redirect issue and gives specific error messages.
     */
    public LoginResponse login(LoginRequest request) {
        // 1. Check if email exists specifically
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("This email is not registered."));

        // 2. Check password with Try/Catch to separate the error
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            
            // If we get here, password is correct
            String token = tokenProvider.generateToken(authentication);
            return new LoginResponse(token, new UserResponse(user));

        } catch (AuthenticationException e) {
            // 3. Catch the error and throw a specific message
            // We use RuntimeException so it returns 400 Bad Request (which doesn't redirect)
            throw new RuntimeException("Incorrect password. Please try again.");
        }
    }

    /**
     * SIGNUP METHOD (Kept the same as your working version)
     */
    public UserResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Set<Role> roles = new HashSet<>();

        // Handle Role (Single field from frontend)
        if (request.getRole() != null && !request.getRole().isEmpty()) {
            String roleName = "ROLE_" + request.getRole().toUpperCase();
            Role userRole = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Error: Role '" + roleName + "' not found."));
            roles.add(userRole);
        } 
        // Handle Roles (List field fallback)
        else if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            request.getRoles().forEach(roleName -> {
                Role role = roleRepository.findByName(roleName)
                        .orElseThrow(() -> new RuntimeException("Error: Role '" + roleName + "' not found."));
                roles.add(role);
            });
        } 
        // Default to Tenant
        else {
            Role tenantRole = roleRepository.findByName("ROLE_TENANT")
                    .orElseThrow(() -> new RuntimeException("Error: Default role 'ROLE_TENANT' not found."));
            roles.add(tenantRole);
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(roles)
                .phone(request.getPhone())
                .profileImage(request.getProfileImage())
                .build();

        User savedUser = userRepository.save(user);
        return new UserResponse(savedUser);
    }

    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponse(user);
    }

//Inside AuthService.java

// ... existing methods

/**
 * SIMULATED Password Reset Flow
 */
public void processForgotPassword(String email) {
    // 1. Check if user exists (Optional: Silent fail is better for security, but we will check for dev)
    userRepository.findByEmail(email).ifPresent(user -> {
        
        // 2. Generate a fake token (In production, generate a UUID and save to DB)
        String resetToken = java.util.UUID.randomUUID().toString();
        
        // 3. SIMULATE SENDING EMAIL
        // Watch your BACKEND TERMINAL for this message!
        System.out.println("=================================================");
        System.out.println("📧 EMAIL SIMULATION - FORGOT PASSWORD");
        System.out.println("TO: " + email);
        System.out.println("LINK: http://localhost:3000/reset-password?token=" + resetToken);
        System.out.println("=================================================");
    });
    
    // We always return success to the frontend to prevent "User Enumeration" attacks
    // (i.e. hackers finding out which emails are registered)
}
}