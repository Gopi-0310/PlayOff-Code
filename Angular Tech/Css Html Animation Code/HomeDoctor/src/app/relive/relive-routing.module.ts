import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReliveComponent } from './relive.component';

const routes: Routes = [{ path: '', component: ReliveComponent },
                        {path:'hari',component:HomeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReliveRoutingModule { }
