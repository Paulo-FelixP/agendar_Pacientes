import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Agendamento {
  id?: number;
  pacienteId: number;
  medico: string;
  dataHoraConsulta: string;
  tipoAtendimento: 'PRESENCIAL' | 'ONLINE';
  statusAgendamento?: 'AGENDADO' | 'CANCELADO';
}

export interface FiltroAgendamento {
  pacienteId?: number;
  medico?: string;
  status?: 'AGENDADO' | 'CANCELADO';
}

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private url = '/agendamentos';

  constructor(private http: HttpClient) {}

  // espelha exatamente os 3 @RequestParam do AgendamentoController: pacienteId, medico, status
  listar(filtro?: FiltroAgendamento): Observable<Agendamento[]> {
    let params = new HttpParams();
    if (filtro?.pacienteId) params = params.set('pacienteId', filtro.pacienteId);
    if (filtro?.medico)     params = params.set('medico', filtro.medico);
    if (filtro?.status)     params = params.set('status', filtro.status);

    return this.http.get<Agendamento[]>(this.url, { params });
  }

  criar(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.url, agendamento);
  }

  // espelha o PUT /agendamentos/cancelar/{id} com o corpo { motivo: "..." } do CancelamentoDTO
  cancelar(id: number, motivo: string): Observable<Agendamento> {
    return this.http.put<Agendamento>(`${this.url}/cancelar/${id}`, { motivo });
  }
}
