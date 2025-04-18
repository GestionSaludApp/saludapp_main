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

// CARGAR DATOS DEL USUARIO EN EL SERVICIO
setUsuario(respuesta: any): void {
  console.log(respuesta.tipo);
  const usuario = respuesta.usuario;  //Selecciona el usuario eliminando mensajes

  let usuarioInstanciado;

  // Dependiendo del tipo de usuario, se instancia la clase correspondiente
  if (respuesta.tipo === 'paciente') {
    usuarioInstanciado = new Paciente();
  } else if (respuesta.tipo === 'profesional') {
    usuarioInstanciado = new Profesional();
  } else if (respuesta.tipo === 'administrador') {
    usuarioInstanciado = new Administrador();
  } else {
    console.error('Tipo de usuario no reconocido:', respuesta.tipo);
    return;
  }

  // Guarda la instancia del usuario en el servicio
  usuarioInstanciado.cargarDatos(usuario);
  this.usuarioSubject.next(usuarioInstanciado);

  console.log('Usuario recibido:', usuarioInstanciado);
  console.log('Usuario activo: ', this.getNombreUsuarioActivo());
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

  getNombreUsuarioActivo(){
    return this.getUsuario()?.nombre || null;
  }


}
