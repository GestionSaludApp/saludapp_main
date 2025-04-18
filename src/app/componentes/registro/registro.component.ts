import { Component } from '@angular/core';
import { NuevoUsuarioComponent } from "../nuevosElementos/nuevo-usuario/nuevo-usuario.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NuevoUsuarioComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

}
