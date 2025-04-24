import { Component } from '@angular/core';
import { Turno } from '../../../clases/turno';
import { obtenerDiccionario } from '../../../funciones/diccionario';

@Component({
  selector: 'app-ver-turnos-disponibles',
  standalone: true,
  imports: [],
  templateUrl: './ver-turnos-disponibles.component.html',
  styleUrl: './ver-turnos-disponibles.component.css'
})
export class VerTurnosDisponiblesComponent{
  texto = obtenerDiccionario();
  
  turnosDisponibles: Turno[] = [];

  filtroActivo: boolean = false;
  filtroDia: number | null = null;
  filtroSeccional: number | null = null;
  filtroEspecialidad: number | null = null;

  filtrar(criterio: string, valor: number){
    switch (criterio) {
      case 'dia':
        this.filtroDia = valor;
        break;
      case 'seccional':
        this.filtroSeccional = valor;
        break;
      case 'especialidad':
        this.filtroEspecialidad = valor;
        break;
      default:
        if (!this.filtroDia && !this.filtroSeccional && !this.filtroEspecialidad) {
          this.filtroActivo = false;
        }
        break;
    }
    this.cargarTurnos();
  }

  cargarTurnos(){
    this.filtroActivo = true;
    //lamada a la base de datos
  }
  




}
