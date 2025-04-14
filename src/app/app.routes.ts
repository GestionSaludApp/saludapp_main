import { Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';

import { RegistroComponent } from './componentes/registro/registro.component';

import { AyudaComponent } from './componentes/dinamicos/ayuda/ayuda.component';
import { ErrorComponent } from './componentes/error/error.component';


export const routes: Routes = [

    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //Redirección DEFAULT

    { path: 'irInicio', component: InicioComponent },

    { path: 'irRegistro', component: RegistroComponent },
    { path: 'irIngreso', component: IngresoComponent },

    { path: 'irAyuda', component: AyudaComponent },
    { path: 'irError', component: ErrorComponent },
    



];
