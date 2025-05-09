import { Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { AyudaComponent } from './componentes/ayuda/ayuda.component';
import { ErrorComponent } from './componentes/error/error.component';

import { RegistroComponent } from './componentes/registro/registro.component';

import { DatosPersonalesComponent } from './componentes/usuario/datos-personales/datos-personales.component';
import { CalendarioComponent } from './componentes/usuario/calendario/calendario.component';
import { VerTurnosDisponiblesComponent } from './componentes/turnos/ver-turnos-disponibles/ver-turnos-disponibles.component';

import { EspecialidadesComponent } from './componentes/gestionElementos/especialidades/especialidades.component';



export const routes: Routes = [

    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //Redirección DEFAULT

    { path: 'inicio', component: InicioComponent },
    { path: 'datosPersonales', component: DatosPersonalesComponent },
    { path: 'calendario', component: CalendarioComponent },

    { path: 'registro', component: RegistroComponent },
    { path: 'ingreso', component: IngresoComponent },

    { path: 'especialidades', component: EspecialidadesComponent },

    { path: 'ayuda', component: AyudaComponent },
    { path: 'error', component: ErrorComponent },

    { path: 'turnosDisponibles', component: VerTurnosDisponiblesComponent },
    



];
