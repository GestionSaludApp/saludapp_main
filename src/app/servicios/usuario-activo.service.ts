import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paciente } from '../clases/subClases/paciente';
import { Profesional } from '../clases/subClases/profesional';
import { Administrador } from '../clases/subClases/administrador';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActivoService {
  
  private usuarioSubject = new BehaviorSubject<Paciente | Profesional | Administrador | null>(null);

  constructor() { }

  //CARGAR DATOS DEL USUARIO EN EL SERVICIO
  setUsuario(usuario: Paciente | Profesional | Administrador): void {
    this.usuarioSubject.next(usuario);
    console.log('Nuevo usuario activo: '+usuario);
  }

  //ELIMINAR DATOS DEL USUARIO
  limpiarUsuario(): void {
    this.usuarioSubject.next(null);
  }

  //VER UNA INSTANTANEA DEL USUARIO ACTIVO
  getUsuario(): Paciente | Profesional | Administrador | null {
    return this.usuarioSubject.value;
  }

  //TRAER DINAMICAMENTE AL USUARIO (MANTIENE DATOS ACTUALIZADOS)
  getUsuarioObservable() {
    return this.usuarioSubject.asObservable();
  }


}
