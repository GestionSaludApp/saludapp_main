import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { Administrador, Paciente, Profesional } from '../clases/perfil';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActivoService {
  
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  constructor() { }

  // CARGAR DATOS DEL USUARIO EN EL SERVICIO
  setUsuario(datosUsuario: any, datosPerfilActivo: any): void {
    const usuario = datosUsuario;
    const perfilActivo = datosPerfilActivo;

    console.log(usuario);
    console.log(perfilActivo);

    let usuarioInstanciado = new Usuario();

    // Dependiendo del tipo de usuario, se instancia la clase correspondiente
    if (usuario.tipo === 'paciente') {
      usuarioInstanciado.perfilActivo = new Paciente();
    } else if (usuario.tipo === 'profesional') {
      usuarioInstanciado.perfilActivo = new Profesional();
    } else if (usuario.tipo === 'administrador') {
      usuarioInstanciado.perfilActivo = new Administrador();
    } else {
      console.error('Tipo de usuario no reconocido:', usuario.tipo);
      return;
    }

    // Guarda la instancia del usuario en el servicio
    usuarioInstanciado.cargarDatosBloque(usuario);
    usuarioInstanciado.perfilActivo.cargarDatosBloque(perfilActivo);
    this.usuarioSubject.next(usuarioInstanciado);

  }

  //ELIMINAR DATOS DEL USUARIO
  limpiarUsuario(): void {
    this.usuarioSubject.next(null);
  }

  //VER UNA INSTANTANEA DEL PERFIL ACTIVO DEL USUARIO ACTIVO
  get perfil(): Paciente | Profesional | Administrador | null | undefined {
    return this.usuarioSubject.value?.perfilActivo;
  }

  //TRAER DINAMICAMENTE AL PERFIL DEL USUARIO (MANTIENE DATOS ACTUALIZADOS)
  get perfilObservable$() {
    return this.usuarioSubject.asObservable().pipe(map(usuario => usuario?.perfilActivo ?? null));
  }

  //ESTO TRAE TODO EL USUARIO (POSIBLEMENTE NO DEBA IMPLEMENTARSE)
  get usuario() {
    return this.usuarioSubject.value;
  }

  //ESTO TRAE TODO EL USUARIO DINAMICAMENTE (POSIBLEMENTE NO DEBA IMPLEMENTARSE)
  get usuarioObservable$() {
    return this.usuarioSubject.asObservable();
  }

}
