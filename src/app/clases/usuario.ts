//class usuario tiene sólo los datos comunes a todos los usuarios, excepto por invitado.
import { Administrador, Paciente, Perfil, Profesional } from "./perfil";


export class Usuario {
  email: string;
  password: string;
  tipo: string;
  fechaCreacion: string;
  ultimoIngreso: string;
  perfilActivo: Paciente | Profesional | Administrador | null | undefined;
  perfiles: Perfil[]; //id de la tabla de usuariosRol subrogados; en perfiles[0] figura el propio.

  //El constructor inicializa todo vacio para facilitar la gestion en el resto de los componentes.
  constructor(){
    this.email = '';
    this.password = '';
    this.tipo = '';

    this.fechaCreacion = '';
    this.ultimoIngreso = '';

    this.perfilActivo = null;
    this.perfiles = [];
  }

  //Cargar datos recibe los datos reales del usuario.
  cargarDatos(
    email: string,
    password: string,
    tipo: string,
    fechaCreacion: string,
    ultimoIngreso: string,
    perfiles: Perfil[],
  ){
    this.email = email;
    this.password = password;
    this.tipo = tipo;

    this.fechaCreacion = fechaCreacion;
    this.ultimoIngreso = ultimoIngreso;

    this.perfiles = perfiles;
  }

  cargarDatosBloque(datos: Partial<Usuario>) {
    Object.assign(this, datos);
  }

  //Cargar un perfil
  set nuevoPerfilActivo(perfilActivo: Paciente | Profesional | Administrador){
    this.perfilActivo = perfilActivo;
  }

}