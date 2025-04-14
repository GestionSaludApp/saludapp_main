import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {

  constructor(private router: Router) {}

  irAyuda(){this.router.navigate(['/irAyuda']);}

  irConfiguracion(){this.router.navigate(['/configuracion']);} //EJEMPLO

}
