import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredLoginComponent } from './secured-login.component';

describe('SecuredLoginComponent', () => {
  let component: SecuredLoginComponent;
  let fixture: ComponentFixture<SecuredLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecuredLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuredLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
