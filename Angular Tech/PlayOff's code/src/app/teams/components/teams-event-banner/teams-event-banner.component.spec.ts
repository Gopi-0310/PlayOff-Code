import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsEventBannerComponent } from './teams-event-banner.component';

describe('TeamsEventBannerComponent', () => {
  let component: TeamsEventBannerComponent;
  let fixture: ComponentFixture<TeamsEventBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsEventBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsEventBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
