import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { Paciente } from '../clases/subClases/paciente';
import { Profesional } from '../clases/subClases/profesional';
import { Administrador } from '../clases/subClases/administrador';
import { UsuarioActivoService } from './usuario-activo.service';

@Injectable({
  providedIn: 'root'
})

export class BasededatosService {
  private apiUrl = 'https://saludapp-saludapp.mdbgo.io';

  constructor(private http: HttpClient, private usuarioActivo: UsuarioActivoService) {}

  registrarUsuario(nuevoUsuario: Usuario, datosUsuario: Paciente|Profesional|Administrador): Observable<any> {
    console.log('Usuario a registrar:', nuevoUsuario);

    const body = {
      nuevoUsuario,
      datosUsuario
    };

    return this.http.post(this.apiUrl + '/registrarUsuario', body)
      .pipe(
        catchError(error => {
          console.error('Error al registrar usuario:', error);
          return throwError(error);
        })
      );

  }

  ingresarUsuario(email: string, password: string): Observable<Paciente | Profesional | Administrador> {
    const body = { email, password };

    return this.http.post<Paciente | Profesional | Administrador>(this.apiUrl + '/ingresarUsuario', body).pipe(
      tap(usuario => {
        this.usuarioActivo.setUsuario(usuario);
      }),
      catchError(error => {
        console.error('Error al ingresar usuario:', error);
        return throwError(() => error);
      })
    );
  }



}
