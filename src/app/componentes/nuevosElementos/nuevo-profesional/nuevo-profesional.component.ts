import { Component, EventEmitter, Input, Output } from '@angular/core';
import { obtenerDiccionario } from '../../../funciones/diccionario';
import { FormsModule } from '@angular/forms';
import { dias, formatearFechaSinHora, leerMinutos } from '../../../funciones/fechas';
import { categoriasPerfil, especialidades, seccionales } from '../../../funciones/listas';
import { NgFor } from '@angular/common';
import { Disponibilidad } from '../../../clases/disponibilidad';

@Component({
  selector: 'app-nuevo-profesional',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './nuevo-profesional.component.html',
  styleUrl: './nuevo-profesional.component.css'
})
export class NuevoProfesionalComponent {
  @Input() categoria: string = categoriasPerfil[0];
  texto = obtenerDiccionario();
  listaEspecialidadesLocal = especialidades;
  listaSeccionalesLocal = seccionales;
  listaDiasLocal = dias;
  
  nombreIngresado: string = '';
  apellidoIngresado: string = '';
  advertenciaNombres: string = '';
  dniIngresado: string = '';
  advertenciaDNI: string = '';
  fechaNacimientoIngresada: string = '';

  especialidadSeleccionada: number = 0;
  disponibilidadesCreadas: Disponibilidad[] = [];

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
    
    for (let disp of this.disponibilidadesCreadas) {
      if (disp.idEspecialidad != this.especialidadSeleccionada) {verificado = false}
    } //Verifica que no se haya modificado la seleccion de especialidad entre creación de horarios

    const fechaFormateada = formatearFechaSinHora(this.fechaNacimientoIngresada);

    if (verificado) {
      this.datosGenerados.emit({
        rol: 'profesional',
        categoria: this.categoria,
        alias: this.nombreIngresado.trim() + ' (' + this.categoria + ')',

        nombre: this.nombreIngresado.trim(),
        apellido: this.apellidoIngresado.trim(),
        dni: this.dniIngresado.trim(),
        fechaNacimiento: fechaFormateada,
        idEspecialidad: this.especialidadSeleccionada,
        disponibilidad: this.disponibilidadesCreadas
      });
    } else {
      this.datosGenerados.emit({})
    }
  }

  agregarDisponibilidad() {
    const nuevaDisponibilidad = new Disponibilidad();
    nuevaDisponibilidad.idEspecialidad = this.especialidadSeleccionada;
    this.disponibilidadesCreadas.push(nuevaDisponibilidad);
  }
  eliminarDisponibilidad(index: number) {
    this.disponibilidadesCreadas.splice(index, 1);
  }

  actualizarHora(event: Event, disp: Disponibilidad, momento: string) {
    const input = event.target as HTMLInputElement;
    const valor = input.value;
    if (!valor) return;
  
    const [horas, minutos] = valor.split(':').map(Number);
    if (momento === 'inicio') {
      disp.horaInicio = horas * 60 + minutos;
    } else {disp.horaFin = horas * 60 + minutos;}
  }
  leerMinutosLocal(input: number): string {return leerMinutos(input);}

}
