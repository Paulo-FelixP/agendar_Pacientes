package com.clinica.agendar.dto;

import com.clinica.agendar.entity.StatusAgendamento;
import com.clinica.agendar.entity.TipoAtendimento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AgendamentoDTO {

    @NotNull(message = "Obrigatorio!")
    private long pacienteId;

    @NotBlank(message = "Obrigatorio!")
    private String medico;

    @NotNull(message = "Obrigatorio!")
    private LocalDateTime dataHoraConsulta;

    @NotBlank(message = "Obrigatorio!")
    private TipoAtendimento tipoAtendimento;
}
