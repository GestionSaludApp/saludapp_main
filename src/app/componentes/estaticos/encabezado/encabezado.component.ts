import { Component, OnInit } from '@angular/core';
import { NavegacionService } from '../../../servicios/navegacion.service';
import { Subscription } from 'rxjs';
import { UsuarioActivoService } from '../../../servicios/usuario-activo.service';
import { NgIf } from '@angular/common';
import { Perfil } from '../../../clases/perfil';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [NgIf],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent implements OnInit{
  
  private perfilSubscripcion: Subscription | null = null;
  perfilActivo: Perfil | null = null;

  constructor(private usuarioActual: UsuarioActivoService, private navegar: NavegacionService) {}

  ngOnInit(): void {
    this.perfilSubscripcion = this.usuarioActual.perfilObservable$.subscribe(perfil => {
      this.perfilActivo = perfil;
    });
  }

  ngOnDestroy(): void {
    if (this.perfilSubscripcion) {
      this.perfilSubscripcion.unsubscribe();
    }
  }
  
  irAyuda(){this.navegar.irAyuda();}
  irInicio(){this.navegar.irInicio();}
  irIngreso(){this.navegar.irIngreso();}
  irDatosPersonales(){this.navegar.irDatosPersonales();}
  irError(){this.navegar.irError();}
  irCalendario(){this.navegar.irCalendario();}
  irRegistro(){this.navegar.irRegistro();}
  irTurnosDisponibles(){this.navegar.irTurnosDisponibles();}


}
