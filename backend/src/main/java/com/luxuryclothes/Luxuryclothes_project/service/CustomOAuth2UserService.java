package com.luxuryclothes.Luxuryclothes_project.service;

// Usa la entidad User y el repositorio UserRepository
import com.luxuryclothes.Luxuryclothes_project.model.User;
import com.luxuryclothes.Luxuryclothes_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");
        String nombre = (String) attributes.get("given_name");
        if (nombre == null || nombre.trim().isEmpty()) {
            nombre = (String) attributes.get("name");
            if (nombre == null || nombre.trim().isEmpty()) {
                nombre = email != null ? email.split("@")[0] : "GoogleUser";
            }
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setNombre(nombre);
            user.setContraseña(""); // Google no da password
            user.setFechaRegistro(LocalDateTime.now());
            userRepository.save(user);
        }
        return oAuth2User;
    }
}
