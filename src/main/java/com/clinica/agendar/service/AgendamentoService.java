package com.clinica.agendar.service;


import com.clinica.agendar.dto.AgendamentoDTO;
import com.clinica.agendar.dto.CancelamentoDTO;
import com.clinica.agendar.entity.Agendamentos;
import com.clinica.agendar.entity.Paciente;
import com.clinica.agendar.entity.StatusAgendamento;
import com.clinica.agendar.exception.RegraDeNegException;
import com.clinica.agendar.repository.AgendamentoRepository;
import com.clinica.agendar.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final MedicosConfig medicosConfig;
    private final PacienteRepository pacienteRepository;
    private final AgendamentoRepository agendamentoRepository;

    public Agendamentos criar(AgendamentoDTO dto) {

        if (dto.getDataHoraConsulta().isBefore(LocalDateTime.now())) {
            throw new RegraDeNegException(
                    "Não é possivel colocar Datas e horas passadas."
            );
        }
        List<Agendamentos> agendamentosNoHorario = agendamentoRepository.findByMedicoAndDataHoraConsultaAndStatusAgendamento(dto.getMedico(), dto.getDataHoraConsulta(), StatusAgendamento.Agendado );

        if(!agendamentosNoHorario.isEmpty()) {
            throw new RegraDeNegException(
                    "Medico com atendimento nesse dia e hora."
            );

        }

        Paciente paciente = pacienteRepository.findById(dto.getPacienteId()).orElseThrow(() -> new RegraDeNegException("Paciente não encontrado"));

        Agendamentos agendamento = new Agendamentos();
        agendamento.setPaciente(paciente);
        agendamento.setMedico(dto.getMedico());
        agendamento.setDataHoraConsulta(LocalDateTime.now());
        agendamento.setStatusAgendamento(StatusAgendamento.Agendado);
        agendamento.setTipoAtendimento(dto.getTipoAtendimento());

        return agendamentoRepository.save(agendamento);
    }

    public Agendamentos cancelar (Long id, CancelamentoDTO dto){
        Agendamentos agendamento = agendamentoRepository.findById(id).orElseThrow(() -> new RegraDeNegException("Agendamento não encontrado"));

        if(agendamento.getStatusAgendamento() == StatusAgendamento.Cancelado) {
            throw new RegraDeNegException("Agendamento ja esta cancelado");
        }

        agendamento.setStatusAgendamento(StatusAgendamento.Cancelado);
        agendamento.setMotivoCancelamento(dto.getMotivo());

        return agendamentoRepository.save(agendamento);
    }

    public List<Agendamentos> listar(Long pacienteId, String medico, StatusAgendamento statusAgendamento) {

        if (pacienteId != null)
            return agendamentoRepository.findByPacienteId(pacienteId);
        if (medico != null)
            return agendamentoRepository.findByMedico(medico);
        if (statusAgendamento != null)
            return agendamentoRepository.findByStatusAgendamento(statusAgendamento);
        return agendamentoRepository.findAll();
    }

}
