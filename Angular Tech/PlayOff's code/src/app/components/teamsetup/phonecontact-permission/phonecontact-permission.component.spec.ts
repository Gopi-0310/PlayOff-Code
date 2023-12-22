import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonecontactPermissionComponent } from './phonecontact-permission.component';

describe('PhonecontactPermissionComponent', () => {
  let component: PhonecontactPermissionComponent;
  let fixture: ComponentFixture<PhonecontactPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonecontactPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhonecontactPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
