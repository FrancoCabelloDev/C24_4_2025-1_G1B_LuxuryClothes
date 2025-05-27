package com.luxuryclothes.Luxuryclothes_project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.luxuryclothes.Luxuryclothes_project.model.User;
import com.luxuryclothes.Luxuryclothes_project.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user) {
        if (user.getContraseña() != null && !user.getContraseña().isEmpty()) {
            // Solo encripta si la contraseña no está ya encriptada (opcional, si quieres evitar doble encriptado)
            if (!user.getContraseña().startsWith("$2a$")) { // patrón típico de BCrypt
                user.setContraseña(passwordEncoder.encode(user.getContraseña()));
            }
        } else {
            // Si la contraseña es vacía, guarda una cadena vacía (para usuarios Google)
            user.setContraseña("");
        }
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // ...otros métodos para recuperación, etc...
}
