import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTurnosDisponiblesComponent } from './ver-turnos-disponibles.component';

describe('VerTurnosDisponiblesComponent', () => {
  let component: VerTurnosDisponiblesComponent;
  let fixture: ComponentFixture<VerTurnosDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTurnosDisponiblesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTurnosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
