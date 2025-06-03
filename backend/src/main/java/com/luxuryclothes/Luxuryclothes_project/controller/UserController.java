package com.luxuryclothes.Luxuryclothes_project.controller;

import com.luxuryclothes.Luxuryclothes_project.entity.User;
import com.luxuryclothes.Luxuryclothes_project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@RequestParam String email) {
        return userRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody User updatedData) {
        String email = updatedData.getEmail();
        return userRepository.findByEmail(email)
                .map(user -> {
                    user.setNombre(updatedData.getNombre());
                    user.setDireccion(updatedData.getDireccion());
                    user.setCelular(updatedData.getCelular());
                    user.setDni(updatedData.getDni());
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
