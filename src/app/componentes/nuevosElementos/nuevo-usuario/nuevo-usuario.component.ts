import { Component } from '@angular/core';
import { tiposDeUsuario } from '../../../funciones/listas';
import { obtenerDiccionario } from '../../../funciones/diccionario';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { Usuario } from '../../../clases/usuario';
import { fechaAhora } from '../../../funciones/fechas';
import { NavegacionService } from '../../../servicios/navegacion.service';
import { NuevoPacienteComponent } from "../nuevo-paciente/nuevo-paciente.component";
import { NuevoProfesionalComponent } from "../nuevo-profesional/nuevo-profesional.component";
import { NuevoAdministradorComponent } from "../nuevo-administrador/nuevo-administrador.component";

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [FormsModule, NgFor, NuevoPacienteComponent, NuevoProfesionalComponent, NuevoAdministradorComponent, NgIf],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  texto = obtenerDiccionario();
  tiposDeUsuarioLocal = tiposDeUsuario;

  emailIngresado: string = '';
  advertenciaEmail: string = '';

  passwordIngresado: string = '';
  advertenciaPassword: string = '';

  passwordConfirmacionIngresado: string = '';
  advertenciaConfirmacionPassword: string = '';

  tipoSeleccionado: 'paciente' | 'profesional' | 'administrador' = 'paciente';

  constructor(private baseDeDatos: BasededatosService, private navegar: NavegacionService) {}
  
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
    
      this.baseDeDatos.registrarUsuario(nuevoUsuario).subscribe({
        next: () => {
          alert(this.texto.registroExitoso);
          this.limpiarCampos();
          this.navegar.irInicio();
        },
        error: () => {
          alert(this.texto.registroFallido);
          this.limpiarCampos();
        }
      });
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

  limpiarCampos(){
    this.emailIngresado = '';
    this.advertenciaEmail = '';
  
    this.passwordIngresado = '';
    this.advertenciaPassword = '';
  
    this.passwordConfirmacionIngresado = '';
    this.advertenciaConfirmacionPassword = '';
  
    this.tipoSeleccionado = 'paciente';
  }

}

