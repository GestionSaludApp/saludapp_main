import { leerMinutos } from "../funciones/fechas";

export class Disponibilidad {
    idDisponibilidad: number;
    seccional: number;
    dia: number;
    horaInicio: number;
    horaFin: number;

    constructor(){
        this.idDisponibilidad = 0;
        this.seccional = 0;
        this.dia = 0;
        this.horaInicio = 0;
        this.horaFin = 0;
    }

    getHorarioInicio(): string {return leerMinutos(this.horaInicio);}
    getHorarioFin(): string {return leerMinutos(this.horaFin);}
    


}




