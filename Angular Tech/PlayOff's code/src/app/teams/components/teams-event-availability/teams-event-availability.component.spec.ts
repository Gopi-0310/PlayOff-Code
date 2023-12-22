import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsEventAvailabilityComponent } from './teams-event-availability.component';

describe('TeamsEventAvailabilityComponent', () => {
  let component: TeamsEventAvailabilityComponent;
  let fixture: ComponentFixture<TeamsEventAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsEventAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsEventAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
