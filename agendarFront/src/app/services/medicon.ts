import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  private url = '/medicos';

  constructor(private http: HttpClient) {}

  // o back-end devolve um Map<nomeDoMedico, especialidade>
  listar(): Observable<{ [nome: string]: string }> {
    return this.http.get<{ [nome: string]: string }>(this.url);
  }
}
