import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {

  constructor(private router: Router) {}

  irInicio(){this.router.navigate(['/inicio']);}
  irIngreso(){this.router.navigate(['/ingreso']);}

  irDatos(){this.router.navigate(['/datos']);}
  irCalendario(){this.router.navigate(['/calendario']);}

  irRegistro(){this.router.navigate(['/registro']);}

  irAyuda(){this.router.navigate(['/ayuda']);}
  irError(){this.router.navigate(['/error']);}


}
