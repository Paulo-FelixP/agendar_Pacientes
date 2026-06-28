import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService, Paciente } from '../services/paciente.ts';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pacientes.component.html'
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  novo: Paciente = { nome: '', telefone: '', cpf: '', email: '' };
  erro = '';

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.pacienteService.listar().subscribe(lista => this.pacientes = lista);
  }

  salvar(): void {
    this.erro = '';
    this.pacienteService.criar(this.novo).subscribe({
      next: () => {
        this.novo = { nome: '', telefone: '', cpf: '', email: '' };
        this.carregar();
      },
      error: (err) => this.erro = err.error?.message || 'Não foi possível cadastrar o paciente.'
    });
  }
}
