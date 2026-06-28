package com.clinica.agendar.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CancelamentoDTO {

    @NotBlank(message = "o motivo do cancelamento é obrigatorio!")
    private String motivo;
}
