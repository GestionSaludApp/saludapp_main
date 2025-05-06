import { Component, OnInit } from '@angular/core';
import { BasededatosService } from '../../../servicios/basededatos.service';
import { especialidades } from '../../../funciones/listas';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [NgFor],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.css'
})
export class EspecialidadesComponent implements OnInit{
  especialidadesLocal: string[] = [];

  constructor(private baseDeDatos: BasededatosService){}

  ngOnInit(): void {
    this.baseDeDatos.buscarEspecialidades(() => {
      this.especialidadesLocal = especialidades.slice(1);
    });
  }

}
