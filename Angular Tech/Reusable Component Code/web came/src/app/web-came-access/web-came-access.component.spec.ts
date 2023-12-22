import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCameAccessComponent } from './web-came-access.component';

describe('WebCameAccessComponent', () => {
  let component: WebCameAccessComponent;
  let fixture: ComponentFixture<WebCameAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebCameAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebCameAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
