import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {

  constructor(private router: Router) {}

  irInicio(){this.router.navigate(['/irInicio']);}
  irAyuda(){this.router.navigate(['/irAyuda']);}

  irConfiguracion(){this.router.navigate(['/configuracion']);} //EJEMPLO

}
