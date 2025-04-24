import { especialidades } from "../funciones/listas";
import { Disponibilidad } from "./disponibilidad";

export class Perfil<T = Perfil<any>> {
    //desde tabla usuarioPerfiles
    idPerfil: number;
    idUsuario: number;
    categoria: string;
    alias: string;
    rol: 'paciente' | 'profesional' | 'administrador' | null | undefined = null;

    //desde tabla usuariosRol [común a todos]
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: string;
  
    //desde usuariosRol [específicos]
    get especialidad(): string | null {return null;}
    get cronograma(): Disponibilidad[] | null {return null;}

    constructor(){
        this.idPerfil = 0;
        this.idUsuario = 0;
        this.categoria = '';
        this.alias = '';

        this.nombre = '';
        this.apellido = '';
        this.dni = '';
        this.fechaNacimiento = '';
    }

    cargarDatos(datos: Partial<T>) {
      Object.assign(this, datos);
    }

}

export class Paciente extends Perfil<Paciente>{

  constructor(){
    super();
    this.rol = 'paciente';
  }

}

export class Profesional extends Perfil<Profesional>{
    idEspecialidad: number;
    disponibilidad: Disponibilidad[];
  
    //El constructor inicializa todo vacio para facilitar la gestion en el resto de los componentes.
    constructor(){
      super();
      this.rol = 'profesional';
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
        if (disp.diaSemana === dia) {
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
    this.rol = 'administrador';
  }

}
