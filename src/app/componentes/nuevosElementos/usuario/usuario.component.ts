import { Component } from '@angular/core';
import { tiposDeUsuario } from '../../../funciones/listas';
import { diccionario } from '../../../funciones/diccionario';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { Usuario } from '../../../clases/usuario';
import { fechaAhora } from '../../../funciones/fechas';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  texto = diccionario['es'];
  tiposDeUsuarioLocal = tiposDeUsuario;

  emailIngresado: string = '';
  passwordIngresado: string = '';
  tipoSeleccionado: 'paciente' | 'profesional' | 'administrador' = 'paciente';

  constructor(private baseDeDatos: BasededatosService) {}

  registrarUsuario(){
    if (
      this.emailIngresado.trim() === '' ||
      this.passwordIngresado.trim() === '' ||
      !this.tipoSeleccionado
    ) {
      alert(this.texto.faltaInformacion);
      return;
    }

    let nuevoUsuario = new Usuario();
    nuevoUsuario.cargarDatos(
      this.emailIngresado,
      this.passwordIngresado,
      this.tipoSeleccionado,
      fechaAhora,
      fechaAhora,
    );
    
    this.baseDeDatos.registrarUsuario(nuevoUsuario).subscribe();

  }
}
