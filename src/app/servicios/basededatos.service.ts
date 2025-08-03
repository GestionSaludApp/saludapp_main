import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { UsuarioActivoService } from './usuario-activo.service';
import { Perfil } from '../clases/perfil';
import { Disponibilidad } from '../clases/disponibilidad';
import { Turno } from '../clases/turno';
import { cargarEspecialidades } from '../funciones/listas';
import { Especialidad } from '../clases/especialidad';

@Injectable({
  providedIn: 'root'
})

export class BasededatosService {
  private apiUrl = 'https://saludapp-saludapp.mdbgo.io';

  constructor(private http: HttpClient, private usuarioActivo: UsuarioActivoService) {}

  registrarUsuario(nuevoUsuario: Usuario, nuevoPerfil: Perfil): Observable<any> {

    const body = {
      nuevoUsuario,
      nuevoPerfil: nuevoPerfil
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

  ingresarPerfil(idUsuario: number, idPerfil: number): Observable<Perfil> {
    const body = { idUsuario, idPerfil };

    return this.http.post<any>(this.apiUrl + '/ingresarPerfil', body).pipe(
      tap(datos => {
        this.usuarioActivo.setPerfil(datos.perfilActivo);
      }),
      catchError(error => {
        console.error('Error al buscar perfil:', error);
        return throwError(() => error);
      })
    );
  }

  registrarPerfilAdicional(idUsuario: number, nuevoPerfil: Perfil): Observable<any> {

    const body = {
      idUsuario: idUsuario,
      nuevoPerfil: nuevoPerfil
    };

    console.log(body);

    return this.http.post(this.apiUrl + '/registrarPerfilAdicional', body)
      .pipe(
        catchError(error => {
          console.error('Error al registrar el nuevo perfil:', error);
          return throwError(error);
        })
      );

  }
  
  buscarDisponibilidades(filtros: any): Observable<Disponibilidad[]> {
    return this.http.post<any[]>(this.apiUrl + '/buscarDisponibilidades', filtros).pipe(
      map(respuesta => {
        return respuesta.map(datos => {
          const disponibilidad = new Disponibilidad();
          disponibilidad.cargarDatos(datos);
          return disponibilidad;
        });
      })
    );
  }

  buscarTurnos(filtros: any): Observable<Turno[]> {
    return this.http.post<any[]>(this.apiUrl + '/buscarTurnos', filtros).pipe(
      map(respuesta => {
        return respuesta.map(datos => {
          const turno = new Turno();
          turno.cargarDatos(datos);
          return turno;
        });
      })
    );
  }

  buscarTurnosActivos(filtros: any): Observable<Turno[]> {
    return this.http.post<any[]>(this.apiUrl + '/buscarTurnosActivos', filtros).pipe(
      map(respuesta => {
        return respuesta.map(datos => {
          const turno = new Turno();
          turno.cargarDatos(datos);
          return turno;
        });
      })
    );
  }

  solicitarTurno(turno: Turno): Observable<Turno> {
    return this.http.post<any>(this.apiUrl + '/solicitarTurno', turno).pipe(
      map(respuesta => {
        if (respuesta.valido && respuesta.turno) {
          const nuevoTurno = new Turno();
          nuevoTurno.cargarDatos(respuesta.turno);
          return nuevoTurno;
        } else {
          throw new Error(respuesta.mensaje || 'Error al solicitar turno');
        }
      })
    );
  }

  buscarEspecialidades(callback: () => void) {
    this.http.post<Especialidad[]>(this.apiUrl +'/buscarEspecialidades','').subscribe({
      next: (listaEspecialidades) => {
        cargarEspecialidades(listaEspecialidades);
        callback();
      },
      error: (err) => {
        console.error('Error al cargar especialidades', err);
      }
    });
  }

}
