import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationsRoutingModule } from './informations-routing.module';
import { DoctorListComponent } from '../common/doctor-list/doctor-list.component';
import { PationDetailsComponent } from './pation-details/pation-details.component';
import { DoctorsComponent } from '../common/doctors/doctors.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    PationDetailsComponent,
    DoctorsComponent,
    DoctorListComponent
  ],
  imports: [
    CommonModule,
    InformationsRoutingModule,
    ToastrModule.forRoot({
      
    })
  ]
})
export class InformationsModule { }
