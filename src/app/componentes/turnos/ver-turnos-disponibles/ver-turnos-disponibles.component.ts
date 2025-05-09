import { Component } from '@angular/core';
import { Turno } from '../../../clases/turno';
import { obtenerDiccionario } from '../../../funciones/diccionario';
import { Disponibilidad } from '../../../clases/disponibilidad';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { NgFor, NgIf } from '@angular/common';
import { dias } from '../../../funciones/fechas';
import { especialidades, seccionales } from '../../../funciones/listas';
import { FormsModule } from '@angular/forms';
import { UsuarioActivoService } from '../../../servicios/usuario-activo.service';

@Component({
  selector: 'app-ver-turnos-disponibles',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
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
  duracion: number = 20;

  filtroActivo: boolean = false;
  filtroDia: number | null = null;
  filtroSeccional: number | null = null;
  filtroEspecialidad: number | null = null;

  constructor(private baseDeDatos: BasededatosService, private usuarioActual: UsuarioActivoService) {}
  
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
    
    this.baseDeDatos.buscarTurnos(filtros).subscribe({
      next: (turnos: Turno[]) => {
        this.turnosDisponibles = turnos;
      },
      error: (error) => {
        console.error('Error al cargar turnos:', error);
      }
    });
  }

  solicitarTurno(turno: Turno) {
    let idPerfil = this.usuarioActual.perfil?.idPerfil;
    if (idPerfil) {
      turno.idPaciente = idPerfil;
    } else {return}
    
    this.baseDeDatos.solicitarTurno(turno).subscribe({
      error: (error) => {
        console.error('Error al solicitar turno:', error.message);
      }
    });
  }

}
