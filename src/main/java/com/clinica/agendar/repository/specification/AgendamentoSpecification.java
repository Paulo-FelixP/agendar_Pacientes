package com.clinica.agendar.repository.specification;

import com.clinica.agendar.entity.Agendamentos;
import com.clinica.agendar.entity.StatusAgendamento;
import org.springframework.data.jpa.domain.Specification;

public class AgendamentoSpecification {

    public static Specification<Agendamentos> paciente(Long pacienteId) {

        return (root, query, criteriaBuilder) -> {

            if (pacienteId == null) {
                return null;
            }

            return criteriaBuilder.equal(
                    root.get("paciente").get("id"),
                    pacienteId
            );
        };
    }

    public static Specification<Agendamentos> medico(String medico) {

        return (root, query, criteriaBuilder) -> {

            if (medico == null || medico.isBlank()) {
                return null;
            }

            return criteriaBuilder.equal(
                    root.get("medico"),
                    medico
            );
        };
    }

    public static Specification<Agendamentos> status(StatusAgendamento status) {

        return (root, query, criteriaBuilder) -> {

            if (status == null) {
                return null;
            }

            return criteriaBuilder.equal(
                    root.get("statusAgendamento"),
                    status
            );
        };
    }

}