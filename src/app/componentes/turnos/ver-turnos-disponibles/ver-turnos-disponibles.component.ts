import { Component } from '@angular/core';
import { Turno } from '../../../clases/turno';
import { obtenerDiccionario } from '../../../funciones/diccionario';
import { Disponibilidad } from '../../../clases/disponibilidad';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { NgFor } from '@angular/common';
import { dias } from '../../../funciones/fechas';
import { especialidades, seccionales } from '../../../funciones/listas';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-turnos-disponibles',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './ver-turnos-disponibles.component.html',
  styleUrl: './ver-turnos-disponibles.component.css'
})
export class VerTurnosDisponiblesComponent{
  texto = obtenerDiccionario();
  diasLocal = dias;
  seccionalesLocal = seccionales;
  especialidadesLocal = especialidades;
  
  disponibilidadesActivas: Disponibilidad[] = [];
  turnosDisponibles: Turno[] = [];

  filtroActivo: boolean = false;
  filtroDia: number | null = null;
  filtroSeccional: number | null = null;
  filtroEspecialidad: number | null = null;

  constructor(private baseDeDatos: BasededatosService) {}
  
  filtrar() {
    const filtros: any = {};
  
    if (this.filtroDia !== null) {
      filtros.diaSemana = this.filtroDia;
    }
  
    if (this.filtroSeccional !== null) {
      filtros.idSeccional = this.filtroSeccional;
    }
  
    if (this.filtroEspecialidad !== null) {
      filtros.idEspecialidad = this.filtroEspecialidad;
    }
  
    this.baseDeDatos.buscarDisponibilidades(filtros).subscribe({
      next: (disponibilidades: Disponibilidad[]) => {
        this.disponibilidadesActivas = disponibilidades;
        console.log('Disponibilidades activas:', this.disponibilidadesActivas);
      },
      error: (error) => {
        console.error('Error al cargar disponibilidades:', error);
      }
    });
  }

}
