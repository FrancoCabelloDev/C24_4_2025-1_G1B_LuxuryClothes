package com.luxuryclothes.Luxuryclothes_project.controller;

import com.luxuryclothes.Luxuryclothes_project.entity.User;
import com.luxuryclothes.Luxuryclothes_project.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/google")
    public User loginWithGoogle(@RequestBody Map<String, String> body) throws Exception {
        String token = body.get("token");
        return authService.verifyAndLogin(token);
    }
}