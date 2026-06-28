package com.clinica.agendar.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "agendamentos")
public class Agendamentos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    private LocalDateTime dataHoraConsulta;

    @Enumerated(EnumType.STRING)
    private TipoAtendimento tipoAtendimento;

    @Enumerated
    private StatusAgendamento statusAgendamento;

    private String medico;

    private String motivoCancelamento;

}
