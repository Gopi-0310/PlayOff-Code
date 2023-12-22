import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsTeamdetailsComponent } from './teams-teamdetails.component';

describe('TeamsTeamdetailsComponent', () => {
  let component: TeamsTeamdetailsComponent;
  let fixture: ComponentFixture<TeamsTeamdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsTeamdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsTeamdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
