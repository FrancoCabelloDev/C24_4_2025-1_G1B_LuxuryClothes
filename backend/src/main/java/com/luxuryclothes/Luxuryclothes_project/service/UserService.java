package com.luxuryclothes.Luxuryclothes_project.service;

import com.luxuryclothes.Luxuryclothes_project.entity.User;
import com.luxuryclothes.Luxuryclothes_project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public User findOrCreate(String email, String name) {
        return repository.findByEmail(email).orElseGet(() -> {
            String fakePassword = encoder.encode(UUID.randomUUID().toString());
            User newUser = new User(
                null, // id
                email,
                name,
                fakePassword,
                null, // celular
                null, // direccion
                null  // dni
            );
            logger.info("Registrando nuevo usuario: {}", newUser);
            return repository.save(newUser);
        });
    }
}
