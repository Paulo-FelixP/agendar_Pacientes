package com.clinica.agendar.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PacienteDTO {

    @NotBlank(message = "Nome é Obrigatorio")
    private String nome;

    @NotBlank(message = "Telefone é obrigatorio!")
    private String telefone;

    @NotBlank(message = "CPF é obrigatorio")
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter exatamente 11 dígitos")
    private String cpf;

    private String email;

}
