import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsDetailtopComponent } from './teams-detailtop.component';

describe('TeamsDetailtopComponent', () => {
  let component: TeamsDetailtopComponent;
  let fixture: ComponentFixture<TeamsDetailtopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsDetailtopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsDetailtopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
