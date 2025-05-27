package com.luxuryclothes.Luxuryclothes_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.luxuryclothes.Luxuryclothes_project.model.User;
import com.luxuryclothes.Luxuryclothes_project.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        if (user.getContraseña() != null && !user.getContraseña().isEmpty()) {
            user.setContraseña(passwordEncoder.encode(user.getContraseña()));
        }
        User saved = userService.register(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/test-save")
    public ResponseEntity<?> testSave() {
        User user = new User();
        user.setNombre("Prueba");
        user.setEmail("prueba@correo.com");
        user.setContraseña("");
        user.setFechaRegistro(java.time.LocalDateTime.now());
        User saved = userService.register(user);
        return ResponseEntity.ok(saved);
    }
}
