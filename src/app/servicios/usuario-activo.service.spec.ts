import { TestBed } from '@angular/core/testing';

import { UsuarioActivoService } from './usuario-activo.service';

describe('UsuarioActivoService', () => {
  let service: UsuarioActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
