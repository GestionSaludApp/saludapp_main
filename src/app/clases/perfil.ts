import { especialidades } from "../funciones/listas";
import { Disponibilidad } from "./disponibilidad";

export class Perfil<T = Perfil<any>> {
    idPerfiles: number;
    idUsuario: number;
    rol: string;
    idRol: number;
    alias: string;

    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: string;
  
    constructor(){
        this.idPerfiles = 0;
        this.idUsuario = 0;
        this.rol = '';
        this.idRol = 0;
        this.alias = '';

        this.nombre = '';
        this.apellido = '';
        this.dni = '';
        this.fechaNacimiento = '';
    }

    cargarDatosBloque(datos: Partial<T>) {
      Object.assign(this, datos);
    }

    getTipo(): string {
      return this.constructor.name;
    }

    get especialidad(): string | null {
      return null;
    }

    get cronograma(): Disponibilidad[] | null {
      return null;
    }
    
  }

export class Paciente extends Perfil<Paciente>{

  constructor(){
    super();
  }

}

export class Profesional extends Perfil<Profesional>{
    idEspecialidad: number;
    disponibilidad: Disponibilidad[];
  
    //El constructor inicializa todo vacio para facilitar la gestion en el resto de los componentes.
    constructor(){
      super();
      this.idEspecialidad = 0;
      this.disponibilidad = [];
    }

    override get especialidad(): string | null {
      return especialidades[this.idEspecialidad];
    }
    override get cronograma(): Disponibilidad[] | null {
      return this.disponibilidad;
    }
    
    getCargaHorariaTotal() {
      let horasTotal = 0;

      for (let disp of this.disponibilidad) {
        let tiempoDisp = disp.horaFin - disp.horaInicio;
        horasTotal = horasTotal + tiempoDisp;
      }

      return horasTotal
    }
    getCargaHorariaDia(dia: number) {
      let horasTotal = 0;

      for (let disp of this.disponibilidad) {
        if (disp.dia === dia) {
          let tiempoDisp = disp.horaFin - disp.horaInicio;
          horasTotal = horasTotal + tiempoDisp;
        }
      }

      return horasTotal
    }
  
}

export class Administrador extends Perfil<Administrador>{
  
  constructor(){
    super();
  }

}
