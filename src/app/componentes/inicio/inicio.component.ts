import { Component, OnInit } from '@angular/core';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { NavegacionService } from '../../servicios/navegacion.service';
import { Perfil } from '../../clases/perfil';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgIf],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{  
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

  irDatosPersonales(){this.navegar.irDatosPersonales();}

  irTurnosDisponibles(){this.navegar.irTurnosDisponibles();}
  irTurnosActivos(){this.navegar.irTurnosActivos();}

  irTurnosAtencion(){this.navegar.irTurnosAtencion();}

  irEspecialidades(){this.navegar.irEspecialidades();}
  irSeccionales(){this.navegar.irSeccionales();}
  irPersonal(){this.navegar.irPersonal();}
  irClientes(){this.navegar.irClientes();}
  irHabilitaciones(){this.navegar.irHabilitaciones();}
}
