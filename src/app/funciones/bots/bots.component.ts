import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../clases/usuario';
import { Perfil } from '../../clases/perfil';
import { BasededatosService } from '../../servicios/basededatos.service';
import { fechaAhora } from '../fechas';
import { categoriasUsuario } from '../listas';

@Component({
  selector: 'app-bots',
  standalone: true,
  imports: [],
  templateUrl: './bots.component.html',
  styleUrl: './bots.component.css'
})
export class BotsComponent implements OnInit{

constructor(private baseDeDatos: BasededatosService){}

ngOnInit(): void {
  this.generarYRegistrarProfesionales();
}

generarYRegistrarProfesionales() {
  const nombres = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elena', 'Fernando', 'Gabriela', 'Hugo', 'Isabel', 'Juan'];
  const apellidos = ['Pérez', 'Gómez', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Acosta'];

  for (let i = 0; i < 50; i++) {
    const numero = 100 + i;

    let nuevoUsuario = new Usuario();
      nuevoUsuario.email = `profesional-${numero}@email.com`;
      nuevoUsuario.password = this.generarPassword();
      nuevoUsuario.fechaCreacion = fechaAhora;
      nuevoUsuario.ultimoIngreso = fechaAhora;

    let idEspecialidad = this.generarNumero(1, 12);
    const datosPerfil = {
      rol: 'profesional' as 'profesional',
      categoria: categoriasUsuario[0],
      alias: 'Profesional aleatorio (' + categoriasUsuario[0] + ')',

      nombre: this.obtenerAleatorio(nombres),
      apellido: this.obtenerAleatorio(apellidos),
      dni: this.generarDNI().toLocaleString(),
      fechaNacimiento: this.generarFechaNacimiento(),
      idEspecialidad: idEspecialidad,
      disponibilidad: this.generarDisponibilidades(idEspecialidad)
    };

    let nuevoPerfil = new Perfil();
    nuevoPerfil.cargarDatos(datosPerfil);


    this.baseDeDatos.registrarUsuario(nuevoUsuario, nuevoPerfil).subscribe({
      next: (res) => console.log(`Registrado profesional ${numero}: `, res),
      error: (err) => console.error(`Error registrando profesional ${numero}: `, err)
    });
  }
}

// Funciones auxiliares

private generarPassword(): string {
  const mayuscula = String.fromCharCode(this.generarNumero(65, 90));
  const numero = this.generarNumero(0, 9).toString();
  const signos = ['!', '?', '@', '#', '$'];
  const signo = signos[this.generarNumero(0, signos.length - 1)];
  const minusculas = Array.from({ length: 5 }, () => String.fromCharCode(this.generarNumero(97, 122))).join('');
  return mayuscula + numero + signo + minusculas;
}

private obtenerAleatorio(array: string[]): string {
  return array[this.generarNumero(0, array.length - 1)];
}

private generarDNI(): number {
  return this.generarNumero(20000000, 45000000);
}

private generarFechaNacimiento(): string {
  const dia = this.generarNumero(1, 28).toString().padStart(2, '0');
  const mes = this.generarNumero(1, 12).toString().padStart(2, '0');
  const anio = this.generarNumero(1970, 2000);
  return `${dia}/${mes}/${anio}, 00:00`;
}

private generarNumero(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

private generarDisponibilidades(idEspecialidad: number): any[] {
  const cantidadDisponibilidades = this.generarNumero(2, 6);
  const idSeccional = this.generarNumero(1, 6);
  const diasDisponibles: number[] = [];
  const disponibilidades = [];

  while (disponibilidades.length < cantidadDisponibilidades) {
    let diaSemana = this.generarNumero(1, 6);
    if (diasDisponibles.includes(diaSemana)) continue;
    diasDisponibles.push(diaSemana);

    let horaInicio = this.generarNumero(480, 1080); // entre 8:00 (480 min) y 18:00 (1080 min)
    let horaFin = horaInicio + this.generarNumero(120, 480); // +2 horas mínimo, +8 horas máximo

    if (horaFin > 1200) horaFin = 1200; // no pasar de las 20:00 (1200 min)

    disponibilidades.push({
      idEspecialidad,
      idSeccional,
      diaSemana,
      horaInicio,
      horaFin
    });
  }

  return disponibilidades;
}

}
