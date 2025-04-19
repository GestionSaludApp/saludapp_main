import { Component } from '@angular/core';
import { obtenerDiccionario } from '../../../funciones/diccionario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-paciente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nuevo-paciente.component.html',
  styleUrl: './nuevo-paciente.component.css'
})
export class NuevoPacienteComponent {
  texto = obtenerDiccionario();
  
  nombreIngresado: string = '';
  apellidoIngresado: string = '';
  dniIngresado: string = '';
  fechaNacimientoIngresada: string = '';

  verificarDatos(){

  }

}
