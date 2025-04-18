import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAdministradorComponent } from './nuevo-administrador.component';

describe('NuevoAdministradorComponent', () => {
  let component: NuevoAdministradorComponent;
  let fixture: ComponentFixture<NuevoAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
