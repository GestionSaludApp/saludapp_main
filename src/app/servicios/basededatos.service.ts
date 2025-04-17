import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})

export class BasededatosService {
  //private apiUrl = 'http://localhost:3000';
  private apiUrl = 'https://saludapp-saludapp.mdbgo.io/';

  constructor(private http: HttpClient) {}

  /*
  registrarUsuario(nuevoUsuario: Usuario): Observable<any> {
    console.log('Usuario a registrar:', nuevoUsuario);

    return this.http.post(this.apiUrl + 'registrarUsuario', nuevoUsuario)
      .pipe(
        catchError(error => {
          console.error('Error al registrar usuario:', error);
          return throwError(error);
        })
      );
  }
  */

  registrarUsuario(nuevoUsuario: Usuario): Observable<any>{
    return this.http.post(this.apiUrl + 'registrarUsuario', nuevoUsuario);
  }

}
