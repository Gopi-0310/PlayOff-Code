import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsMemberdetailsComponent } from './teams-memberdetails.component';

describe('TeamsMemberdetailsComponent', () => {
  let component: TeamsMemberdetailsComponent;
  let fixture: ComponentFixture<TeamsMemberdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsMemberdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsMemberdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
