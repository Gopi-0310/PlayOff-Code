import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsMemberbannerComponent } from './teams-memberbanner.component';

describe('TeamsMemberbannerComponent', () => {
  let component: TeamsMemberbannerComponent;
  let fixture: ComponentFixture<TeamsMemberbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsMemberbannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsMemberbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
