import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionalesComponent } from './seccionales.component';

describe('SeccionalesComponent', () => {
  let component: SeccionalesComponent;
  let fixture: ComponentFixture<SeccionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
