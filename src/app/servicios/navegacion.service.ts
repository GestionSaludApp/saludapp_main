import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {

  constructor(private router: Router) {}

  irInicio(){this.router.navigate(['/irInicio']);}
  irIngreso(){this.router.navigate(['/irIngreso']);}

  irRegistro(){this.router.navigate(['/irRegistro']);}

  irAyuda(){this.router.navigate(['/irAyuda']);}
  irError(){this.router.navigate(['/irError']);}

  irConfiguracion(){this.router.navigate(['/configuracion']);} //EJEMPLO

}
