import { Component } from '@angular/core';
import { diccionario } from '../../../funciones/diccionario';
import { NavegacionService } from '../../../servicios/navegacion.service';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {
  texto = diccionario['es'];

  constructor(private navegar: NavegacionService) {}

  irAyuda(){this.navegar.irAyuda();}
  irInicio(){this.navegar.irInicio();}
  irIngreso(){this.navegar.irIngreso();}
  irDatosPersonales(){this.navegar.irDatosPersonales();}
  irError(){this.navegar.irError();}
  irCalendario(){this.navegar.irCalendario();}
  irRegistro(){this.navegar.irRegistro();}


}
