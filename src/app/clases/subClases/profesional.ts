import { especialidades } from "../../funciones/listas";
import { Disponibilidad } from "../disponibilidad";

export class Profesional {
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: string;
    especialidad: number;
    disponibilidad: Disponibilidad[];
  
    //El constructor inicializa todo vacio para facilitar la gestion en el resto de los componentes.
    constructor(){
      this.nombre = '';
      this.apellido = '';
      this.dni = '';
      this.fechaNacimiento = '';
      this.especialidad = 0;
      this.disponibilidad = [];
    }
  
    //Cargar datos recibe los datos reales del usuario.
    cargarDatos(datos: any){
      this.nombre = datos.nombre;
      this.apellido = datos.apellido;
      this.dni = datos.dni;
  
      this.fechaNacimiento = datos.fechaNacimiento;
      this.especialidad = datos.especialidad;
      this.disponibilidad = datos.disponibilidad;
    }

    getEspecialidad() {return especialidades[this.especialidad]};
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