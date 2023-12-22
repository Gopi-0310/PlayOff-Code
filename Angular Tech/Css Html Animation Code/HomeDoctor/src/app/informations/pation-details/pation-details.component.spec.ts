import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PationDetailsComponent } from './pation-details.component';

describe('PationDetailsComponent', () => {
  let component: PationDetailsComponent;
  let fixture: ComponentFixture<PationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
