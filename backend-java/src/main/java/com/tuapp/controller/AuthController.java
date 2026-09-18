package com.tuapp.controller;

import com.tuapp.dto.LoginRequest;
import com.tuapp.dto.RegisterRequest;
import com.tuapp.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    // constructor
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // aca es donde llegan las peticiones de login y register desde el frontend
    // se las pasa al service para que haga la logica de negocio
    // con Spring @Valid primero se invoca los validators
    // antes de invocar al metodo

    @PostMapping("/register")
    public Map<String, Object> register(@Valid @RequestBody RegisterRequest body) {
        System.out.println("REGISTER: " + body.getEmail());
        // llamar al metodo register de authService.java y devolver el resultado
        return authService.register(body); 
    }

    @PostMapping("/login")
    public Map<String, Object> login(@Valid @RequestBody LoginRequest body) {
        System.out.println("LOGIN: " + body.getEmail());
        // llamar al metodo register de authService.java y devolver el resultado
        return authService.login(body);
    }
}
