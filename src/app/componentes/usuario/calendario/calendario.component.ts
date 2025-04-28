import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { obtenerDiccionario } from '../../../funciones/diccionario';
import { Turno } from '../../../clases/turno';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { UsuarioActivoService } from '../../../servicios/usuario-activo.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [NgFor],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit{
  texto = obtenerDiccionario();

  turnosActivos: Turno[] = [];

  constructor(private usuarioActual: UsuarioActivoService, private baseDeDatos: BasededatosService){}

  ngOnInit(): void {
    if (this.usuarioActual.perfil) {
      this.buscarTurnos();
    }
  }

  buscarTurnos(){
    const filtros: any = {};

    if (this.usuarioActual.perfil) {
      filtros.idPerfil = this.usuarioActual.perfil.idPerfil;
      this.baseDeDatos.buscarTurnosActivos(filtros).subscribe({
        next: (turnos: Turno[]) => {
          this.turnosActivos = turnos;
  
          console.log('Turnos reservados:', this.turnosActivos);
        },
        error: (error) => {
          console.error('Error al cargar turnos:', error);
        }
      });  
    }
  }


}
