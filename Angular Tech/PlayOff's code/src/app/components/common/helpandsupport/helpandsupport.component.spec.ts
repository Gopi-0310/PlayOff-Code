import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpandsupportComponent } from './helpandsupport.component';

describe('HelpandsupportComponent', () => {
  let component: HelpandsupportComponent;
  let fixture: ComponentFixture<HelpandsupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpandsupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpandsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
