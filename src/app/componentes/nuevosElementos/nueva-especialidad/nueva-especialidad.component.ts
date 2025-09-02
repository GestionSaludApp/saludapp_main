import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Especialidad } from '../../../clases/especialidad';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { UsuarioActivoService } from '../../../servicios/usuario-activo.service';

@Component({
  selector: 'app-nueva-especialidad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nueva-especialidad.component.html',
  styleUrl: './nueva-especialidad.component.css'
})
export class NuevaEspecialidadComponent {
especialidad: Especialidad = new Especialidad();

  constructor(private usuarioActivo: UsuarioActivoService, private baseDeDatos: BasededatosService) {}

  guardarEspecialidad() {
    this.baseDeDatos.agregarEspecialidad(this.usuarioActivo.idUsuario, this.especialidad).subscribe({
      next: (res) => {
        console.log('Especialidad guardada:', res);
        this.especialidad = new Especialidad();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
      }
    });
  }

}