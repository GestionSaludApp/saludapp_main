import { Component, OnInit } from '@angular/core';
import { NuevaSeccionalComponent } from "../../nuevosElementos/nueva-seccional/nueva-seccional.component";
import { NgFor, NgIf } from '@angular/common';
import { Seccional } from '../../../clases/seccional';
import { Subscription } from 'rxjs';
import { Perfil } from '../../../clases/perfil';
import { UsuarioActivoService } from '../../../servicios/usuario-activo.service';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { seccionales } from '../../../funciones/listas';

@Component({
  selector: 'app-seccionales',
  standalone: true,
  imports: [NgFor, NgIf, NuevaSeccionalComponent],
  templateUrl: './seccionales.component.html',
  styleUrl: './seccionales.component.css'
})
export class SeccionalesComponent implements OnInit{
  seccionalesLocal: Seccional[] = [];
  private perfilSubscripcion: Subscription | null = null;
  perfilActivo: Perfil | null = null;
  mostrarPanelNueva: boolean = false;
  
  constructor(private usuarioActual: UsuarioActivoService, private baseDeDatos: BasededatosService) {}

  ngOnInit(): void {
    this.perfilSubscripcion = this.usuarioActual.perfilObservable$.subscribe(perfil => {
      this.perfilActivo = perfil;
    });
    this.baseDeDatos.buscarSeccionales(() => {
      this.seccionalesLocal = seccionales.slice(1);
    });
  }

  ngOnDestroy(): void {
    if (this.perfilSubscripcion) {
      this.perfilSubscripcion.unsubscribe();
    }
  }

  mostrarPanelNuevaSeccional(){
    this.mostrarPanelNueva = !this.mostrarPanelNueva;
  }

  exportarCSV() {
    const csvContent = this.generarCSV(this.seccionalesLocal);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'seccionales_disponibles.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  generarCSV(seccionales: Seccional[]): string {
    const headers = 'Seccional; Direccion, Ciudad, Provincia, Telefono, Email\n';
    const rows = seccionales.map(seccional => {
      return `
        ${this.eliminarTildes(seccional.nombre)};
        ${this.eliminarTildes(seccional.direccion)};
        ${this.eliminarTildes(seccional.ciudad)};
        ${this.eliminarTildes(seccional.provincia)};
        ${seccional.telefono};
        ${seccional.email}`;
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
