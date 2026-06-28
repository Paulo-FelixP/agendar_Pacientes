import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  id?: number;
  nome: string;
  telefone: string;
  cpf: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private url = '/pacientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url);
  }

  criar(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.url, paciente);
  }
}
