export class Administrador {
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: string;
  
    //El constructor inicializa todo vacio para facilitar la gestion en el resto de los componentes.
    constructor(){
      this.nombre = '';
      this.apellido = '';
      this.dni = '';
      this.fechaNacimiento = '';
    }
  
    //Cargar datos recibe los datos reales del usuario.
    cargarDatos(datos: any){
      this.nombre = datos.nombre;
      this.apellido = datos.apellido;
      this.dni = datos.dni;
  
      this.fechaNacimiento = datos.fechaNacimiento;
    }
  
  }