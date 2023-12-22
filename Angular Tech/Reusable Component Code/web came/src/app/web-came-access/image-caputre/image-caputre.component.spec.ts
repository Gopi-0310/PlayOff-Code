import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCaputreComponent } from './image-caputre.component';

describe('ImageCaputreComponent', () => {
  let component: ImageCaputreComponent;
  let fixture: ComponentFixture<ImageCaputreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCaputreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCaputreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
