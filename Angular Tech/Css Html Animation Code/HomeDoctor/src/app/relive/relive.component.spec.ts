import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliveComponent } from './relive.component';

describe('ReliveComponent', () => {
  let component: ReliveComponent;
  let fixture: ComponentFixture<ReliveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReliveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReliveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
