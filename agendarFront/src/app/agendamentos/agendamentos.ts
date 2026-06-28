import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendamentoService, Agendamento, FiltroAgendamento } from '../services/agendamento';
import { PacienteService, Paciente } from '../services/paciente';
import { MedicoService } from '../services/medicon';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamentos.html'
})
export class AgendamentosComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  pacientes: Paciente[] = [];
  medicos: { [nome: string]: string } = {};
  erro = '';

  modoPaciente: 'existente' | 'novo' = 'existente';

  novo: Agendamento = {
    pacienteId: 0,
    medico: '',
    dataHoraConsulta: '',
    tipoAtendimento: 'PRESENCIAL'
  };

  novoPaciente: Paciente = { nome: '', telefone: '', cpf: '', email: '' };

  // mesmos 3 filtros que existem no Spring; vazio = sem filtro
  filtro: FiltroAgendamento = { pacienteId: 0, medico: '', status: undefined };

  constructor(
    private agendamentoService: AgendamentoService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    this.carregar();
    this.carregarPacientes();
    this.medicoService.listar().subscribe(lista => this.medicos = lista);
  }

  carregar(): void {
    const filtroEnviado: FiltroAgendamento = {
      pacienteId: this.filtro.pacienteId || undefined,
      medico: this.filtro.medico || undefined,
      status: this.filtro.status || undefined
    };
    this.agendamentoService.listar(filtroEnviado).subscribe(lista => this.agendamentos = lista);
  }

  limparFiltro(): void {
    this.filtro = { pacienteId: 0, medico: '', status: undefined };
    this.carregar();
  }

  carregarPacientes(): void {
    this.pacienteService.listar().subscribe(lista => this.pacientes = lista);
  }

  nomePaciente(id: number): string {
    const p = this.pacientes.find(p => p.id === id);
    return p ? p.nome : `Paciente #${id}`;
  }

  salvar(): void {
    this.erro = '';

    if (this.modoPaciente === 'novo') {
      this.pacienteService.criar(this.novoPaciente).subscribe({
        next: (pacienteCriado) => {
          this.novo.pacienteId = pacienteCriado.id!;
          this.criarAgendamento();
        },
        error: (err) => this.erro = err.error?.message || 'Não foi possível cadastrar o paciente.'
      });
    } else {
      this.criarAgendamento();
    }
  }

  private criarAgendamento(): void {
    this.agendamentoService.criar(this.novo).subscribe({
      next: () => {
        this.novo = { pacienteId: 0, medico: '', dataHoraConsulta: '', tipoAtendimento: 'PRESENCIAL' };
        this.novoPaciente = { nome: '', telefone: '', cpf: '', email: '' };
        this.modoPaciente = 'existente';
        this.carregar();
        this.carregarPacientes();
      },
      error: (err) => this.erro = err.error?.message || 'Não foi possível criar o agendamento.'
    });
  }

  cancelar(agendamento: Agendamento): void {
    const motivo = prompt('Motivo do cancelamento:');
    if (!motivo) return; // CancelamentoDTO exige motivo (NotBlank), então não envia vazio

    this.erro = '';
    this.agendamentoService.cancelar(agendamento.id!, motivo).subscribe({
      next: () => this.carregar(),
      error: (err) => this.erro = err.error?.message || 'Não foi possível cancelar.'
    });
  }
}
