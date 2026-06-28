package com.clinica.agendar.controller;


import com.clinica.agendar.dto.AgendamentoDTO;
import com.clinica.agendar.dto.CancelamentoDTO;
import com.clinica.agendar.entity.Agendamentos;
import com.clinica.agendar.entity.StatusAgendamento;
import com.clinica.agendar.service.AgendamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<Agendamentos> criar(@Valid @RequestBody AgendamentoDTO dto){
        return ResponseEntity.status(201).body(agendamentoService.criar(dto));

    }

    @GetMapping
    public ResponseEntity<List<Agendamentos>> listar(
            @RequestParam(required = false) Long pacienteId,
            @RequestParam(required = false) String medico,
            @RequestParam(required = false)StatusAgendamento status
            ){
        return ResponseEntity.ok(agendamentoService.listar(pacienteId, medico, status));
    }

    @PutMapping("/cancelar")
    public ResponseEntity<Agendamentos> cancelar(@PathVariable Long id, @Valid @RequestBody CancelamentoDTO dto){
        return ResponseEntity.ok(agendamentoService.cancelar(id, dto));
    }
}
