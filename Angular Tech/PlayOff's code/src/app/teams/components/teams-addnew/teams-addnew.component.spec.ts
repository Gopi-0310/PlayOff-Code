import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsAddnewComponent } from './teams-addnew.component';

describe('TeamsAddnewComponent', () => {
  let component: TeamsAddnewComponent;
  let fixture: ComponentFixture<TeamsAddnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsAddnewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsAddnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
