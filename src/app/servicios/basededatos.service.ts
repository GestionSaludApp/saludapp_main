import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { UsuarioActivoService } from './usuario-activo.service';
import { Perfil } from '../clases/perfil';

@Injectable({
  providedIn: 'root'
})

export class BasededatosService {
  private apiUrl = 'https://saludapp-saludapp.mdbgo.io';

  constructor(private http: HttpClient, private usuarioActivo: UsuarioActivoService) {}

  registrarUsuario(nuevoUsuario: Usuario, datosPerfil: Perfil): Observable<any> {
    //console.log('Usuario a registrar:', nuevoUsuario); //DEBUG
    //console.log('Datos de usuario:', datosPerfil); //DEBUG

    const body = {
      nuevoUsuario,
      datosPerfil: datosPerfil
    };

    return this.http.post(this.apiUrl + '/registrarUsuario', body)
      .pipe(
        catchError(error => {
          console.error('Error al registrar usuario:', error);
          return throwError(error);
        })
      );

  }

  ingresarUsuario(email: string, password: string): Observable<Usuario> {
    const body = { email, password };

    return this.http.post<any>(this.apiUrl + '/ingresarUsuario', body).pipe(
      tap(datos => {
        this.usuarioActivo.setUsuario(datos.usuario, datos.perfilActivo);
      }),
      catchError(error => {
        console.error('Error al ingresar usuario:', error);
        return throwError(() => error);
      })
    );
  }



}
