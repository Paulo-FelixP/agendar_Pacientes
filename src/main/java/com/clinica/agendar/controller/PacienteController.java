package com.clinica.agendar.controller;


import com.clinica.agendar.dto.PacienteDTO;
import com.clinica.agendar.entity.Paciente;
import com.clinica.agendar.service.PacienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pacientes")
public class PacienteController {

    private final PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<Paciente> criar(@Valid @RequestBody PacienteDTO dto) {
        return ResponseEntity.status(201).body(pacienteService.criar(dto));

    }

    @GetMapping
    public ResponseEntity<List<Paciente>> listar() {
        return ResponseEntity.ok(pacienteService.listar());
    }
}
