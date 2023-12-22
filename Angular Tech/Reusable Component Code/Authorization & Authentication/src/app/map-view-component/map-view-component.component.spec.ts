import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewComponentComponent } from './map-view-component.component';

describe('MapViewComponentComponent', () => {
  let component: MapViewComponentComponent;
  let fixture: ComponentFixture<MapViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapViewComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
