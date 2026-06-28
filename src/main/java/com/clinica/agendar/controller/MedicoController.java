package com.clinica.agendar.controller;


import com.clinica.agendar.service.MedicosConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/medicos")
public class MedicoController {

    private final MedicosConfig medicosConfig;

    @GetMapping
    public ResponseEntity<Map<String,String>> listar() {
        return ResponseEntity.ok(medicosConfig.getTodos());
    }
}
