import { Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { DatosPersonalesComponent } from './componentes/dinamicos/datos-personales/datos-personales.component';

import { RegistroComponent } from './componentes/registro/registro.component';

import { CalendarioComponent } from './componentes/dinamicos/calendario/calendario.component';

import { AyudaComponent } from './componentes/dinamicos/ayuda/ayuda.component';
import { ErrorComponent } from './componentes/error/error.component';




export const routes: Routes = [

    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //Redirección DEFAULT

    { path: 'inicio', component: InicioComponent },
    { path: 'datosPersonales', component: DatosPersonalesComponent },
    { path: 'calendario', component: CalendarioComponent },

    { path: 'registro', component: RegistroComponent },
    { path: 'ingreso', component: IngresoComponent },

    { path: 'ayuda', component: AyudaComponent },
    { path: 'error', component: ErrorComponent },
    



];
