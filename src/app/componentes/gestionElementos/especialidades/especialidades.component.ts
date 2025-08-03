import { Component, OnInit } from '@angular/core';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { especialidades } from '../../../funciones/listas';
import { NgFor } from '@angular/common';
import { Especialidad } from '../../../clases/especialidad';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { UsuarioActivoService } from '../../../servicios/usuario-activo.service';
import { Perfil } from '../../../clases/perfil';
import { NuevaEspecialidadComponent } from "../../nuevosElementos/nueva-especialidad/nueva-especialidad.component";

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [NgFor, NgIf, NuevaEspecialidadComponent],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.css'
})
export class EspecialidadesComponent implements OnInit{
  especialidadesLocal: Especialidad[] = [];
  private perfilSubscripcion: Subscription | null = null;
  perfilActivo: Perfil | null = null;
  mostrarPanelNueva: boolean = false;
  
  constructor(private usuarioActual: UsuarioActivoService, private baseDeDatos: BasededatosService) {}

  ngOnInit(): void {
    this.perfilSubscripcion = this.usuarioActual.perfilObservable$.subscribe(perfil => {
      this.perfilActivo = perfil;
    });
    this.baseDeDatos.buscarEspecialidades(() => {
    this.especialidadesLocal = especialidades.slice(1);
    });
  }

  ngOnDestroy(): void {
  if (this.perfilSubscripcion) {
    this.perfilSubscripcion.unsubscribe();
  }
  }

  mostrarPanelNuevaEspecialidad(){
    this.mostrarPanelNueva = !this.mostrarPanelNueva;
  }

  proxy(){}

}
