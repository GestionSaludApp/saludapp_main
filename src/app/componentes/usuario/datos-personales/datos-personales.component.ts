import { Component, OnInit } from '@angular/core';
import { UsuarioActivoService } from '../../../servicios/usuario-activo.service';
import { CommonModule, NgIf } from '@angular/common';
import { Paciente } from '../../../clases/subClases/paciente';
import { Profesional } from '../../../clases/subClases/profesional';
import { Administrador } from '../../../clases/subClases/administrador';
import { Subscription } from 'rxjs';
import { obtenerDiccionario } from '../../../funciones/diccionario';
import { especialidades } from '../../../funciones/listas';
import { dias } from '../../../funciones/fechas';

@Component({
  selector: 'app-datos-personales',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.css'
})
export class DatosPersonalesComponent implements OnInit{
  texto = obtenerDiccionario();
  especialidades = especialidades;
  dias = dias;

  private usuarioSubscripcion: Subscription | null = null;
  usuarioActivo: Paciente | Profesional | Administrador | null = null;
  
  constructor(private usuarioActual: UsuarioActivoService) {}

  ngOnInit(): void {
    this.usuarioSubscripcion = this.usuarioActual.getUsuarioObservable().subscribe(usuario => {
      this.usuarioActivo = usuario;
    });
  }

  ngOnDestroy(): void {
    if (this.usuarioSubscripcion) {
      this.usuarioSubscripcion.unsubscribe();
    }
  }

  mostrarDatos(tipoDato: string): any {
    let dato: any;
    
    if (this.usuarioActivo && this.usuarioActivo instanceof Profesional) {
      switch (tipoDato) {
        case 'especialidad':
          dato = especialidades[this.usuarioActivo.especialidad];
          break;
        case 'disponibilidad':
          dato = this.usuarioActivo.disponibilidad;
          break;
      }
    }

    return dato
  }

}
