import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcameComponent } from './webcame.component';

describe('WebcameComponent', () => {
  let component: WebcameComponent;
  let fixture: ComponentFixture<WebcameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebcameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
