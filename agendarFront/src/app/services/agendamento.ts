import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Agendamento {
  id?: number;
  pacienteId: number;
  medico: string;
  dataHoraConsulta: string; // formato "2026-07-01T14:30:00"
  tipoAtendimento: 'PRESENCIAL' | 'ONLINE';
  statusAgendamento?: 'AGENDADO' | 'CANCELADO';
}

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private url = '/agendamentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.url);
  }

  criar(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.url, agendamento);
  }
}
