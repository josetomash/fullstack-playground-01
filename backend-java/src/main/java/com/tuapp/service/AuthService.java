package com.tuapp.service;

import com.tuapp.dto.LoginRequest;
import com.tuapp.dto.RegisterRequest;
import com.tuapp.model.AuthProvider;
import com.tuapp.model.User;
import com.tuapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ──────────────────────────────────────────────────
    // REGISTRO
    // ──────────────────────────────────────────────────
    public Map<String, Object> register(RegisterRequest req) {
        // 1. ¿Ya existe el email?
        if (userRepository.existsByEmail(req.getEmail())) {
            return Map.of(
                "ok", false,
                "message", "Ese email ya está registrado"
            );
        }

        // 2. Crear entidad
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setProvider(AuthProvider.LOCAL);
        user.setEmailVerified(false);

        // 3. Guardar
        User saved = userRepository.save(user);

        // 4. Responder
        return Map.of(
            "ok", true,
            "message", "Usuario registrado",
            "userId", saved.getId(),
            "email", saved.getEmail(),
            "emailVerified", saved.isEmailVerified()
        );
    }

    // ──────────────────────────────────────────────────
    // LOGIN
    // ──────────────────────────────────────────────────
    public Map<String, Object> login(LoginRequest req) {
        // 1. Buscar usuario
        User user = userRepository.findByEmail(req.getEmail()).orElse(null);

        if (user == null) {
            return Map.of(
                "ok", false,
                "message", "Usuario no existe"
            );
        }

        // 2. Verificar contraseña
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return Map.of(
                "ok", false,
                "message", "Credenciales incorrectas"
            );
        }

        // 3. Éxito (por ahora token falso)
        return Map.of(
            "ok", true,
            "message", "Login OK",
            "userId", user.getId(),
            "email", user.getEmail(),
            "emailVerified", user.isEmailVerified(),
            "token", "fake-jwt-token-" + user.getId()
        );
    }
}
