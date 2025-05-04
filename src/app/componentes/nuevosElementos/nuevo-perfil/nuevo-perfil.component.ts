import { Component } from '@angular/core';
import { categoriasPerfil } from '../../../funciones/listas';
import { FormsModule } from '@angular/forms';
import { NuevoPacienteComponent } from "../nuevo-paciente/nuevo-paciente.component";
import { NuevoProfesionalComponent } from "../nuevo-profesional/nuevo-profesional.component";
import { NuevoAdministradorComponent } from "../nuevo-administrador/nuevo-administrador.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-nuevo-perfil',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NuevoPacienteComponent, NuevoProfesionalComponent, NuevoAdministradorComponent],
  templateUrl: './nuevo-perfil.component.html',
  styleUrl: './nuevo-perfil.component.css'
})

export class NuevoPerfilComponent {
  datosPerfil: any = {};
  categoriasPerfilLocal = categoriasPerfil;
  categoriaNuevoPerfil: string = '';
  posiblesPerfiles: string[] = ['paciente', 'profesional', 'administrador'];
  perfilNuevoSeleccionado: string | null = null;

  guardarDatosUsuario(datos: any) {
    this.datosPerfil = datos;
    console.log(this.datosPerfil);
  }

}
