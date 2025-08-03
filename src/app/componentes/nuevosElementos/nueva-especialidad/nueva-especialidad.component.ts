import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nueva-especialidad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nueva-especialidad.component.html',
  styleUrl: './nueva-especialidad.component.css'
})
export class NuevaEspecialidadComponent {
  nombreIngresado: string = '';
  duracionIngresada: number = 0;

  crearEspecialidad(){
    //emitirDatosABDD
  }
}
