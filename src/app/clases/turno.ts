import { dias, leerMinutos } from "../funciones/fechas";
import { especialidades, seccionales } from "../funciones/listas";

export class Turno {
    idTurno: string;
    idProfesional: number;
    idSeccional: number;
    idEspecialidad: number;
    diaSemana: number;
    horaInicio: number;
    horaFin: number;
    idPaciente: number = 0;

    constructor(){
        this.idTurno = '';
        this.idProfesional = 0;
        this.idSeccional = 0;
        this.idEspecialidad = 0;
        this.diaSemana = 0;
        this.horaInicio = 0;
        this.horaFin = 0;
    }
    
    cargarDatos(datos: Partial<Turno>) {
        Object.assign(this, datos);
    }

    seccional():string{
        return seccionales[this.idSeccional].nombre;
    }
    especialidad(): string {
        return especialidades[this.idEspecialidad].nombre;
    }
    dia():string{
        return dias[this.diaSemana];
    }
    horarioInicio():string{
        return leerMinutos(this.horaInicio);
    }
    horarioFin():string{
        return leerMinutos(this.horaFin);
    }
}