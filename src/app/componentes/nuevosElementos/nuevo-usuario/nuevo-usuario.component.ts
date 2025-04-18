import { Component } from '@angular/core';
import { tiposDeUsuario } from '../../../funciones/listas';
import { diccionario } from '../../../funciones/diccionario';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { Usuario } from '../../../clases/usuario';
import { fechaAhora } from '../../../funciones/fechas';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  texto = diccionario;
  tiposDeUsuarioLocal = tiposDeUsuario;

  emailIngresado: string = '';
  advertenciaEmail: string = '';

  passwordIngresado: string = '';
  advertenciaPassword: string = '';

  passwordConfirmacionIngresado: string = '';
  advertenciaConfirmacionPassword: string = '';

  tipoSeleccionado: 'paciente' | 'profesional' | 'administrador' = 'paciente';

  constructor(private baseDeDatos: BasededatosService) {}
  
  registrarUsuario() {
    if (this.verificarDatosIngresados() === true) {
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

  verificarDatosIngresados(): boolean {
    if (this.verificarEmail() && this.verificarPassword()) {return true}
    return false
  }

  verificarEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let textoAdvertencia = '';
    let verificado = true;

    if (this.emailIngresado.trim() === '' || !emailRegex.test(this.emailIngresado)) {
      textoAdvertencia = this.texto.advertenciaEmail;
      verificado = false;
    }

    this.advertenciaEmail = textoAdvertencia;
    return verificado;
  }

  verificarPassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    let textoAdvertencia = '';
    let textoAdvertenciaConfirmacion = '';
    let verificado = true;

    if (!passwordRegex.test(this.passwordIngresado)) {
      textoAdvertencia = this.texto.advertenciaPassword;
      verificado = false;
    }

    if(this.passwordIngresado != this.passwordConfirmacionIngresado) {
      textoAdvertenciaConfirmacion = this.texto.advertenciaConfirmacionPassword;
      verificado = false;
    }

    this.advertenciaPassword = textoAdvertencia;
    this.advertenciaConfirmacionPassword = textoAdvertenciaConfirmacion;
    return verificado;

  }

}

