import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from '../common/doctor-list/doctor-list.component';
import { DoctorsComponent } from '../common/doctors/doctors.component';
import { PationDetailsComponent } from './pation-details/pation-details.component';

const routes: Routes = [
  {path:'doctorList',component:DoctorListComponent},
  {path:'doctors',component:DoctorsComponent},
  {path:'pationList',component:PationDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationsRoutingModule { }
