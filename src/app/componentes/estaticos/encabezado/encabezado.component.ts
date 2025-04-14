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

  irAyuda(){
    this.navegar.irAyuda();
  }
}
