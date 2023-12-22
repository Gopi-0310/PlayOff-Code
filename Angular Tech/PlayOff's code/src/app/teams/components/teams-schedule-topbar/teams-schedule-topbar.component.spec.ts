import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsScheduleTopbarComponent } from './teams-schedule-topbar.component';

describe('TeamsScheduleTopbarComponent', () => {
  let component: TeamsScheduleTopbarComponent;
  let fixture: ComponentFixture<TeamsScheduleTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsScheduleTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsScheduleTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
