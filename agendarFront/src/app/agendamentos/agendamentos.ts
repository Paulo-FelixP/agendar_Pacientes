import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendamentoService, Agendamento } from '../services/agendamento';
import { PacienteService, Paciente } from '../services/paciente';
import { MedicoService } from '../services/medicon';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamentos.component.html'
})
export class AgendamentosComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  pacientes: Paciente[] = [];
  medicos: { [nome: string]: string } = {};
  erro = '';

  novo: Agendamento = {
    pacienteId: 0,
    medico: '',
    dataHoraConsulta: '',
    tipoAtendimento: 'PRESENCIAL'
  };

  constructor(
    private agendamentoService: AgendamentoService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    this.carregar();
    this.pacienteService.listar().subscribe(lista => this.pacientes = lista);
    this.medicoService.listar().subscribe(lista => this.medicos = lista);
  }

  carregar(): void {
    this.agendamentoService.listar().subscribe(lista => this.agendamentos = lista);
  }

  salvar(): void {
    this.erro = '';
    this.agendamentoService.criar(this.novo).subscribe({
      next: () => {
        this.novo = { pacienteId: 0, medico: '', dataHoraConsulta: '', tipoAtendimento: 'PRESENCIAL' };
        this.carregar();
      },
      error: (err) => this.erro = err.error?.message || 'Não foi possível criar o agendamento.'
    });
  }
}
