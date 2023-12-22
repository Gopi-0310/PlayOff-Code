import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapViewComponentComponent } from './map-view-component.component';

const routes: Routes = [{ path: '', component: MapViewComponentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapViewComponentRoutingModule { }
