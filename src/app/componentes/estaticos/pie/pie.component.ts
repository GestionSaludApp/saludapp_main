import { Component } from '@angular/core';
import { obtenerDiccionario } from '../../../funciones/diccionario';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent {
  texto = obtenerDiccionario();
}
