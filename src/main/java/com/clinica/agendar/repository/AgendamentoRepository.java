package com.clinica.agendar.repository;


import com.clinica.agendar.entity.Agendamentos;
import com.clinica.agendar.entity.StatusAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamentos, Long> {
    List<Agendamentos> findByPacienteId(Long pacienteId);
    List<Agendamentos> findByMedico(String medico);
    List<Agendamentos> findByStatusAgendamento(StatusAgendamento status);
    List<Agendamentos> findByMedicoAndDataHoraConsultaAndStatusAgendamento(String medico, LocalDateTime dataHoraConsulta, StatusAgendamento status);

}
