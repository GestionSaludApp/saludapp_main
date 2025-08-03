import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSeccionalComponent } from './nueva-seccional.component';

describe('NuevaSeccionalComponent', () => {
  let component: NuevaSeccionalComponent;
  let fixture: ComponentFixture<NuevaSeccionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaSeccionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaSeccionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
