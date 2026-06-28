package com.clinica.agendar.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PacienteDTO {

    @NotBlank(message = "Nome é Obrigatorio")
    private String Nome;

    @NotBlank(message = "Telefone é obrigatorio!")
    private String Telefone;

    @NotBlank(message = "CPF é obrigatorio")
    private String Cpf;

    private String email;

}
