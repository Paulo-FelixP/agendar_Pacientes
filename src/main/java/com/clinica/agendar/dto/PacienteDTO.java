package com.clinica.agendar.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PacienteDTO {

    @NotBlank(message = "Nome é Obrigatorio")
    private String nome;

    @NotBlank(message = "Telefone é obrigatorio!")
    private String telefone;

    @NotBlank(message = "CPF é obrigatorio")
    private String cpf;

    private String email;

}
