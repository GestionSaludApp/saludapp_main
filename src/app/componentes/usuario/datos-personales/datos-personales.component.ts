import { Component, OnInit } from '@angular/core';
import { UsuarioActivoService } from '../../../servicios/usuario-activo.service';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { obtenerDiccionario } from '../../../funciones/diccionario';
import { especialidades } from '../../../funciones/listas';
import { dias } from '../../../funciones/fechas';
import { Perfil } from '../../../clases/perfil';
import { FormsModule } from '@angular/forms';
import { NuevoPerfilComponent } from "../../nuevosElementos/nuevo-perfil/nuevo-perfil.component";

@Component({
  selector: 'app-datos-personales',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NuevoPerfilComponent],
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.css'
})
export class DatosPersonalesComponent implements OnInit{
  texto = obtenerDiccionario();
  especialidades = especialidades;
  dias = dias;

  private perfilSubscripcion: Subscription | null = null;
  perfilActivo: Perfil | null = null;
  
  constructor(private usuarioActual: UsuarioActivoService) {}

  ngOnInit(): void {
    this.perfilSubscripcion = this.usuarioActual.perfilObservable$.subscribe(perfil => {
      this.perfilActivo = perfil;
    });
  }

  ngOnDestroy(): void {
    if (this.perfilSubscripcion) {
      this.perfilSubscripcion.unsubscribe();
    }
  }

}
