package com.clinica.agendar.service;


import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class MedicosConfig {

    private static final Map<String, String> MEDICOS = Map.of(
            "Dr. Carlos Alberto", "Cardiologia",
            "Dra. Yasmim Santos", "Pediatria",
            "Dr. Hiago Felipe", "Dermatologia",
            "Dra. Fernada Souza", "Ortopedia",
            "Dr. Marcou Silva", "Clínica geral"
    );

    public Map<String, String> getTodos() {
        return MEDICOS;
    }

    public boolean


}
