//class usuario tiene sólo los datos comunes a todos los usuarios, excepto por invitado.

export class Usuario {
  email: string;
  password: string;
  tipo: string;
  fechaCreacion: string;
  ultimoIngreso: string;

  //El constructor inicializa todo vacio para facilitar la gestion en el resto de los componentes.
  constructor(){
    this.email = '';
    this.password = '';
    this.tipo = '';

    this.fechaCreacion = '';
    this.ultimoIngreso = '';
  }

  //Cargar datos recibe los datos reales del usuario.
  cargarDatos(
    email: string,
    password: string,
    tipo: string,
    fechaCreacion: string,
    ultimoIngreso: string,
  ){
    this.email = email;
    this.password = password;
    this.tipo = tipo;

    this.fechaCreacion = fechaCreacion;
    this.ultimoIngreso = ultimoIngreso;
  }

}