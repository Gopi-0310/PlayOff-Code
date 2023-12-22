import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsEventAssignmentsComponent } from './teams-event-assignments.component';

describe('TeamsEventAssignmentsComponent', () => {
  let component: TeamsEventAssignmentsComponent;
  let fixture: ComponentFixture<TeamsEventAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsEventAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsEventAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
