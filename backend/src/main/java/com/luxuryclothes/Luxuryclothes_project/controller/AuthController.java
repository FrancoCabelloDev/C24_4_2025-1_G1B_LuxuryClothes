package com.luxuryclothes.Luxuryclothes_project.controller;

import com.luxuryclothes.Luxuryclothes_project.entity.User;
import com.luxuryclothes.Luxuryclothes_project.service.AuthService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/google")
    public User loginWithGoogle(@RequestBody Map<String, String> body) throws Exception {
        String token = body.get("token");
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token de Google no recibido");
        }
        // Llama al método de instancia, no al estático
        return authService.verifyAndLogin(token);
    }
}