import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidneyComponent } from './kidney.component';

describe('KidneyComponent', () => {
  let component: KidneyComponent;
  let fixture: ComponentFixture<KidneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
