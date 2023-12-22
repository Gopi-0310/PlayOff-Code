import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSettingsComponent } from './teams-settings.component';

describe('TeamsSettingsComponent', () => {
  let component: TeamsSettingsComponent;
  let fixture: ComponentFixture<TeamsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
