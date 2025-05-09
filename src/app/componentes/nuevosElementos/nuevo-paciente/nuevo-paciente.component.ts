import { Component, EventEmitter, Input, Output } from '@angular/core';
import { obtenerDiccionario } from '../../../funciones/diccionario';
import { FormsModule } from '@angular/forms';
import { formatearFechaSinHora } from '../../../funciones/fechas';
import { categoriasPerfil } from '../../../funciones/listas';

@Component({
  selector: 'app-nuevo-paciente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nuevo-paciente.component.html',
  styleUrl: './nuevo-paciente.component.css'
})
export class NuevoPacienteComponent {
  @Input() categoria: string = categoriasPerfil[0];
  texto = obtenerDiccionario();
  
  nombreIngresado: string = '';
  apellidoIngresado: string = '';
  advertenciaNombres: string = '';
  dniIngresado: string = '';
  advertenciaDNI: string = '';
  fechaNacimientoIngresada: string = '';

  @Output() datosGenerados = new EventEmitter<any>();
  
  emitirDatos() {
    const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumerosRegex = /^[0-9]+$/;
    let textoAdvertenciaNombres = '';
    let textoAdvertenciaDNI = '';
    let verificado: boolean = true;
  
    if (!soloLetrasRegex.test(this.nombreIngresado) || !soloLetrasRegex.test(this.apellidoIngresado)) {
      textoAdvertenciaNombres = this.texto.advertenciaNombres;
      verificado = false;
    }
  
    if (!soloNumerosRegex.test(this.dniIngresado)) {
      textoAdvertenciaDNI = this.texto.advertenciaDNI;
      verificado = false;
    }

    this.advertenciaNombres = textoAdvertenciaNombres;
    this.advertenciaDNI = textoAdvertenciaDNI;
    
    const fechaFormateada = formatearFechaSinHora(this.fechaNacimientoIngresada);

    if (verificado) {
      this.datosGenerados.emit({
        rol: 'paciente',
        categoria: this.categoria,
        alias: this.nombreIngresado.trim() + ' (' + this.categoria + ')',

        nombre: this.nombreIngresado.trim(),
        apellido: this.apellidoIngresado.trim(),
        dni: this.dniIngresado.trim(),
        fechaNacimiento: fechaFormateada

      });
    } else {
      this.datosGenerados.emit({})
    }
  }

}
