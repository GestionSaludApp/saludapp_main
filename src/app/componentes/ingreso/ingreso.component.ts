import { Component } from '@angular/core';
import { obtenerDiccionario } from '../../funciones/diccionario';
import { FormsModule } from '@angular/forms';
import { BasededatosService } from '../../servicios/basededatos.service';
import { NavegacionService } from '../../servicios/navegacion.service';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {
  texto = obtenerDiccionario();

  emailIngresado: string = '';
  advertenciaEmail: string = '';
  passwordIngresado: string = '';

  constructor(private baseDeDatos: BasededatosService, private navegar: NavegacionService) {}

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

  limpiarCampos(){
    this.emailIngresado = '';
    this.passwordIngresado = '';
  }

  ingresar(){
    if (this.verificarEmail() === true) {
      this.baseDeDatos.ingresarUsuario(this.emailIngresado, this.passwordIngresado).subscribe({
        next: () => {
          this.limpiarCampos();
          this.navegar.irInicio();
        },
        error: () => {
          alert(this.texto.ingresoFallido);
          this.limpiarCampos();
        }
      });
    }
  }




}
