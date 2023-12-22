import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsEventDetailsComponent } from './teams-event-details.component';

describe('TeamsEventDetailsComponent', () => {
  let component: TeamsEventDetailsComponent;
  let fixture: ComponentFixture<TeamsEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsEventDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
