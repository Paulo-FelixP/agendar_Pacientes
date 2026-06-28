package com.clinica.agendar.testService;


import com.clinica.agendar.dto.PacienteDTO;
import com.clinica.agendar.entity.Paciente;
import com.clinica.agendar.repository.PacienteRepository;
import com.clinica.agendar.service.PacienteService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PacienteServiceTest {

    @Mock
    private PacienteRepository pacienteRepository;
    @InjectMocks
    private PacienteService pacienteService;

    @Test
    void SalvarInfoCorretamente(){
        PacienteDTO dto = new PacienteDTO();
        dto.setNome("João Carlos");
        dto.setCpf("1234567890");
        dto.setTelefone("1234567890");

        Paciente infoSalva = new Paciente();
        infoSalva.setNome(dto.getNome());
        infoSalva.setCpf(dto.getCpf());
        infoSalva.setTelefone(dto.getTelefone());


        when(pacienteRepository.save(any(Paciente.class))).thenReturn(infoSalva);

        Paciente resultado = pacienteService.criar(dto);
        assertEquals("João Carlos", resultado.getNome());
        assertEquals("1234567890", resultado.getCpf());
        assertEquals("1234567890", resultado.getTelefone());
    }

}
