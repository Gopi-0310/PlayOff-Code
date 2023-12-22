import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsTeambannerComponent } from './teams-teambanner.component';

describe('TeamsTeambannerComponent', () => {
  let component: TeamsTeambannerComponent;
  let fixture: ComponentFixture<TeamsTeambannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsTeambannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsTeambannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
