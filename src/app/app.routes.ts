import { Routes } from '@angular/router';
import { AyudaComponent } from './componentes/dinamicos/ayuda/ayuda.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

export const routes: Routes = [

    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //Redirección DEFAULT

    { path: 'inicio', component: InicioComponent },

    { path: 'irAyuda', component: AyudaComponent },



];
