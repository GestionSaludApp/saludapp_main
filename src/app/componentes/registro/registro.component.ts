import { Component } from '@angular/core';
import { UsuarioComponent } from "../nuevosElementos/usuario/usuario.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [UsuarioComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

}
