import { Component } from '@angular/core';
import { PacientesComponent } from './pacientes/pacientes';
import { AgendamentosComponent } from './agendamentos/agendamentos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PacientesComponent, AgendamentosComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Agendar Pacientes';
}
