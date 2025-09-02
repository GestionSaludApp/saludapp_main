import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seccional } from '../../../clases/seccional';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { UsuarioActivoService } from '../../../servicios/usuario-activo.service';

@Component({
  selector: 'app-nueva-seccional',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nueva-seccional.component.html',
  styleUrl: './nueva-seccional.component.css'
})
export class NuevaSeccionalComponent {
  seccional: Seccional = new Seccional();
  
  constructor(private usuarioActivo: UsuarioActivoService, private baseDeDatos: BasededatosService) {}

  guardarSeccional() {
    this.baseDeDatos.agregarSeccional(this.usuarioActivo.idUsuario, this.seccional).subscribe({
      next: (res) => {
        console.log('Seccional guardada:', res);
        this.seccional = new Seccional();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
      }
    });
  }
}
