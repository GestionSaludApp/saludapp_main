import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BasededatosService {
  private apiUrl = 'https://???.mdbgo.io/';

  constructor(private http: HttpClient) {}

  registrarUsuario(nuevoUsuario: Usuario): Observable<any>{
    return this.http.post(this.apiUrl + 'registro'+nuevoUsuario.tipo, nuevoUsuario);
  }

}
