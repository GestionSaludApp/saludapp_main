import { Component, OnInit } from '@angular/core';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { especialidades } from '../../../funciones/listas';
import { NgFor, NgIf } from '@angular/common';
import { Especialidad } from '../../../clases/especialidad';
import { Subscription } from 'rxjs';
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

  exportarCSV() {
  const csvContent = this.generarCSV(this.especialidadesLocal);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'especialidades_disponibles.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  generarCSV(especialidades: Especialidad[]): string {
    const headers = 'Especialidad; Duracion\n';
    const rows = especialidades.map(especialidad => {
      return `${this.eliminarTildes(especialidad.nombre)}; ${especialidad.duracion} minutos`;
    });

    return headers + rows.join('\n');
  }

  eliminarTildes(palabra: string): string {
    let nuevaPalabra = '';

    for (let letra of palabra) {
        if (letra === 'á') {
            nuevaPalabra += 'a';
        } else if (letra === 'é') {
            nuevaPalabra += 'e';
        } else if (letra === 'í') {
            nuevaPalabra += 'i';
        } else if (letra === 'ó') {
            nuevaPalabra += 'o';
        } else if (letra === 'ú') {
            nuevaPalabra += 'u';
        } else {
            nuevaPalabra += letra;
        }
    }
    return nuevaPalabra;
  }

  proxy(){}

}
