import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { UsuarioActivoService } from './usuario-activo.service';
import { Perfil } from '../clases/perfil';
import { Disponibilidad } from '../clases/disponibilidad';
import { Turno } from '../clases/turno';
import { cargarEspecialidades, cargarSeccionales } from '../funciones/listas';
import { Especialidad } from '../clases/especialidad';
import { Seccional } from '../clases/seccional';
import { bddURL } from '../credenciales/datos';
import { Reporte } from '../clases/reporte';

@Injectable({
  providedIn: 'root'
})

export class BasededatosService {
  private apiUrl = 'https://saludapp-saludapp.mdbgo.ios';

  constructor(private http: HttpClient, private usuarioActivo: UsuarioActivoService) {}

  registrarUsuario(nuevoUsuario: Usuario, nuevoPerfil: Perfil, imagen: File | null): Observable<any> {
    const crearBody = () => {
      const body = new FormData();
      body.append('nuevoUsuario', JSON.stringify(nuevoUsuario));
      body.append('nuevoPerfil', JSON.stringify(nuevoPerfil));
      return body;
    };

    if (imagen) {
      return this.guardarImagen('perfilesUsuarios', imagen).pipe(
        switchMap((res: any) => {
          console.log(res);
          nuevoPerfil.imagen = res.resultado;

          return this.http.post(this.apiUrl + '/registrarUsuario', crearBody());
        }),
        catchError(error => {
          console.error('Error al registrar usuario:', error);
          throw error;
        })
      );
    } else {

      return this.http.post(this.apiUrl + '/registrarUsuario', crearBody()).pipe(
        catchError(error => {
          console.error('Error al registrar usuario:', error);
          throw error;
        })
      );
    }
  }

  activarUsuario(email: string, password: string, codigo: string): Observable<any> {
    return this.http.post(this.apiUrl + '/activarMiUsuario', { email, password, codigo });
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
    return this.http.post<any[]>(this.apiUrl + '/buscarTurnosPorUsuario', filtros).pipe(
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

  agregarEspecialidad(idUsuario: number, nuevaEspecialidad: Especialidad, imagen: File | null): Observable<any> {
    const crearBody = () => {
      const body = new FormData();
      body.append('idUsuario', JSON.stringify(idUsuario));
      body.append('nuevaEspecialidad', JSON.stringify(nuevaEspecialidad));
      return body;
    }

    if (imagen) {
      return this.guardarImagen('logosEspecialidad', imagen).pipe(
        switchMap((res: any) => {
          nuevaEspecialidad.imagen = res.resultado;

          return this.http.post(this.apiUrl + '/agregarEspecialidad', crearBody());
        }),
        catchError(error => {
          console.error('Error al registrar la nueva especialidad:', error);
          throw error;
        })
      );
    } else {

      return this.http.post(this.apiUrl + '/agregarEspecialidad', crearBody()).pipe(
        catchError(error => {
          console.error('Error al registrar la nueva especialidad:', error);
          throw error;
        })
      );
    }
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

  editarEspecialidad(idUsuario: number, datosEspecialidad: Especialidad): Observable<any>{
    const body = { idUsuario, datosEspecialidad };
    return this.http.post(this.apiUrl + '/editarEspecialidad', body);
  }

  eliminarEspecialidad(idUsuario: number, datosEspecialidad: Especialidad): Observable<any>{
    const body = { idUsuario, datosEspecialidad };
    return this.http.post(this.apiUrl + '/eliminarEspecialidad', body);
  }

  agregarSeccional(idUsuario: number, nuevaSeccional: Seccional, imagen: File | null): Observable<any>{
    const crearBody = () => {
      const body = new FormData();
      body.append('idUsuario', JSON.stringify(idUsuario));
      body.append('nuevaSeccional', JSON.stringify(nuevaSeccional));
      return body;
    }

    if (imagen) {
      return this.guardarImagen('logosSeccionales', imagen).pipe(
        switchMap((res: any) => {
          nuevaSeccional.imagen = res.resultado;

          return this.http.post(this.apiUrl + '/agregarSeccional', crearBody());
        }),
        catchError(error => {
          console.error('Error al registrar la nueva seccional:', error);
          throw error;
        })
      );
    } else {

      return this.http.post(this.apiUrl + '/agregarSeccional', crearBody()).pipe(
        catchError(error => {
          console.error('Error al registrar la nueva seccional:', error);
          throw error;
        })
      );
    }
  }

  buscarSeccionales(callback: () => void) {
    this.http.post<Seccional[]>(this.apiUrl +'/buscarSeccionales','').subscribe({
      next: (listaSeccionales) => {
        cargarSeccionales(listaSeccionales);
        callback();
      },
      error: (err) => {
        console.error('Error al cargar seccionales', err);
      }
    });
  }

  editarSeccional(idUsuario: number, datosSeccional: Seccional): Observable<any>{
    const body = { idUsuario, datosSeccional };
    return this.http.post(this.apiUrl + '/editarSeccional', body);
  }

  eliminarSeccional(idUsuario: number, datosSeccional: Seccional): Observable<any>{
    const body = { idUsuario, datosSeccional };
    return this.http.post(this.apiUrl + '/eliminarSeccional', body);
  }

  agregarReporte(idUsuario: number, nuevoReporte: Reporte, imagen: File | null): Observable<any> {
    const crearBody = () => {
      const body = new FormData();
      body.append('idUsuario', JSON.stringify(idUsuario));
      body.append('nuevoReporte', JSON.stringify(nuevoReporte));
      return body;
    }

    if (imagen) {
      return this.guardarImagen('reportesMedicos', imagen).pipe(
        switchMap((res: any) => {
          nuevoReporte.imagen = res.resultado;

          return this.http.post(this.apiUrl + '/agregarReporte', crearBody());
        }),
        catchError(error => {
          console.error('Error al agregar el reporte:', error);
          throw error;
        })
      );
    } else {

      return this.http.post(this.apiUrl + '/agregarReporte', crearBody()).pipe(
        catchError(error => {
          console.error('Error al agregar el reporte:', error);
          throw error;
        })
      );
    }
  }

  guardarImagen(directorio: string, imagen: File | null): Observable<any>{
    const body = new FormData();

    body.append('directorio', JSON.stringify(directorio));
    if (imagen) {body.append('imagen', imagen);}

    return this.http.post(this.apiUrl + '/guardarImagen', body);
  }


}
