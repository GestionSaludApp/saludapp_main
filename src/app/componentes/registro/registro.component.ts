import { Component } from '@angular/core';
import { rolesUsuario } from '../../funciones/listas';
import { obtenerDiccionario } from '../../funciones/diccionario';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BasededatosService } from '../../servicios/basededatos.service';
import { Usuario } from '../../clases/usuario';
import { fechaAhora } from '../../funciones/fechas';
import { NavegacionService } from '../../servicios/navegacion.service';
import { NuevoPacienteComponent } from "../nuevosElementos/nuevo-paciente/nuevo-paciente.component";
import { NuevoProfesionalComponent } from "../nuevosElementos/nuevo-profesional/nuevo-profesional.component";
import { NuevoAdministradorComponent } from "../nuevosElementos/nuevo-administrador/nuevo-administrador.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, NgFor, NuevoPacienteComponent, NuevoProfesionalComponent, NuevoAdministradorComponent, NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  texto = obtenerDiccionario();
  rolesUsuarioLocal = rolesUsuario;

  emailIngresado: string = '';
  advertenciaEmail: string = '';

  passwordIngresado: string = '';
  advertenciaPassword: string = '';

  passwordConfirmacionIngresado: string = '';
  advertenciaConfirmacionPassword: string = '';

  rolSeleccionado: 'paciente' | 'profesional' | 'administrador' = 'paciente';
  datosUsuario: any = {};
  camposPorRol: Record<string, string[]> = {
    paciente: ['nombre', 'apellido', 'dni', 'fechaNacimiento'],
    profesional: ['nombre', 'apellido', 'dni', 'fechaNacimiento', 'idEspecialidad', 'disponibilidad'],
    administrador: ['nombre', 'apellido', 'dni', 'fechaNacimiento']
  };

  constructor(private baseDeDatos: BasededatosService, private navegar: NavegacionService) {}
  
  registrarUsuario() {
    if (this.verificarDatosIngresados() && this.verificarDatosUsuarioEmitidos(this.rolSeleccionado, this.datosUsuario)) {
      let nuevoUsuario = new Usuario();
        nuevoUsuario.email = this.emailIngresado,
        nuevoUsuario.password = this.passwordIngresado,
        nuevoUsuario.fechaCreacion = fechaAhora,
        nuevoUsuario.ultimoIngreso = fechaAhora,
      //SIN PERFILES DURANTE CREACION - LUEGO DEL REGISTRO SE AÑADE EL PROPIO;

      this.baseDeDatos.registrarUsuario(nuevoUsuario, this.datosUsuario).subscribe({
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

  verificarDatosUsuarioEmitidos(rol: string, datos: any): boolean {
    const camposRequeridos = this.camposPorRol[rol] || [];
    return camposRequeridos.every(campo => datos[campo]?.toString().trim());
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

  guardarDatosUsuario(datos: any) {
    this.datosUsuario = datos;
  }

  limpiarCampos(){
    this.emailIngresado = '';
    this.advertenciaEmail = '';
  
    this.passwordIngresado = '';
    this.advertenciaPassword = '';
  
    this.passwordConfirmacionIngresado = '';
    this.advertenciaConfirmacionPassword = '';
  
    this.rolSeleccionado = 'paciente';
    this.datosUsuario = {};
  }

}
