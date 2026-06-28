package com.clinica.agendar.repository;


import com.clinica.agendar.entity.Agendamentos;
import com.clinica.agendar.entity.Paciente;
import com.clinica.agendar.entity.StatusAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamentos, Long> {
    List<Agendamentos> findByPacienteid(Long pacienteId);
    List<Agendamentos> findByMedico(String medico);
    List<Agendamentos> findByStatus(StatusAgendamento status);
    List<Agendamentos> findbyMedicoAndDataHoraConsultaAndStatus(String medico, LocalDateTime dataHoraConsulta, StatusAgendamento status);

}
