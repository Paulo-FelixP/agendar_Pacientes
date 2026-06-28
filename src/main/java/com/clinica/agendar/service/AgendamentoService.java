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
import org.springframework.data.jpa.domain.Specification;
import com.clinica.agendar.repository.specification.AgendamentoSpecification;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

        int hora = dto.getDataHoraConsulta().getHour();
        if(hora < 8 || hora > 18) {
            throw new RegraDeNegException("Atendimento das 08:00 as 18:00");
        }

        LocalDateTime inicio = dto.getDataHoraConsulta().minusMinutes(29);
        LocalDateTime fim = dto.getDataHoraConsulta().plusMinutes(29);
        boolean temConflito = agendamentoRepository.existsByMedicoAndDataHoraConsultaBetweenAndStatusAgendamento(dto.getMedico(), inicio, fim, StatusAgendamento.AGENDADO);
        if(temConflito) {
            throw new RegraDeNegException("Ja existe um agendamento cadastrado com esse data e Hora.");
        }



        List<Agendamentos> agendamentosNoHorario = agendamentoRepository.findByMedicoAndDataHoraConsultaAndStatusAgendamento(dto.getMedico(), dto.getDataHoraConsulta(), StatusAgendamento.AGENDADO );

        if(!agendamentosNoHorario.isEmpty()) {
            throw new RegraDeNegException(
                    "Medico com atendimento nesse dia e hora."
            );

        }

        Paciente paciente = pacienteRepository.findById(dto.getPacienteId()).orElseThrow(() -> new RegraDeNegException("Paciente não encontrado"));

        Agendamentos agendamento = new Agendamentos();
        agendamento.setPaciente(paciente);
        agendamento.setMedico(dto.getMedico());
        agendamento.setDataHoraConsulta(dto.getDataHoraConsulta());
        agendamento.setStatusAgendamento(StatusAgendamento.AGENDADO);
        agendamento.setTipoAtendimento(dto.getTipoAtendimento());

        return agendamentoRepository.save(agendamento);
    }

    public Agendamentos cancelar (Long id, CancelamentoDTO dto){
        Agendamentos agendamento = agendamentoRepository.findById(id).orElseThrow(() -> new RegraDeNegException("Agendamento não encontrado"));

        if(agendamento.getStatusAgendamento() == StatusAgendamento.CANCELADO) {
            throw new RegraDeNegException("Agendamento ja esta cancelado");
        }

        agendamento.setStatusAgendamento(StatusAgendamento.CANCELADO);
        agendamento.setMotivoCancelamento(dto.getMotivo());

        return agendamentoRepository.save(agendamento);
    }


    public List<Agendamentos> listar(Long pacienteId, String medico, StatusAgendamento status) {

        Specification<Agendamentos> specification = Specification.where(AgendamentoSpecification.paciente(pacienteId)).and(
                AgendamentoSpecification.medico(medico))
                        .and(
                                AgendamentoSpecification.status(status));

        return agendamentoRepository.findAll(specification);
    }


    public List<String> horariosDisponiveis(String medico, String data){
        LocalDate dia = LocalDate.parse(data);
        LocalDateTime fim = LocalDateTime.of(dia, LocalTime.of(18, 0));

        List<LocalDateTime> todos = new ArrayList<>();
        LocalDateTime h = LocalDateTime.of(dia, LocalTime.of(8, 0));
        while (h.isBefore(fim)) {
            todos.add(h);h = h.plusMinutes(30);


        }
        return todos.stream().filter(horario -> !agendamentoRepository.existsByMedicoAndDataHoraConsultaBetweenAndStatusAgendamento(medico,horario.minusMinutes(29),
                horario.plusMinutes(29), StatusAgendamento.AGENDADO )).map(horario -> horario.toLocalTime().toString()).collect(Collectors.toList());
    }


}
