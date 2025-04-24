import { dias, leerMinutos } from "../funciones/fechas";
import { seccionales } from "../funciones/listas";

export class Disponibilidad {
    idDisponibilidad: number;
    idSeccional: number;
    diaSemana: number;
    horaInicio: number;
    horaFin: number;

    constructor(){
        this.idDisponibilidad = 0;
        this.idSeccional = 0;
        this.diaSemana = 0;
        this.horaInicio = 0;
        this.horaFin = 0;
    }
    
    cargarDatos(datos: Partial<Disponibilidad>) {
        Object.assign(this, datos);
    }

    seccional():string{
        return seccionales[this.idSeccional];
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




