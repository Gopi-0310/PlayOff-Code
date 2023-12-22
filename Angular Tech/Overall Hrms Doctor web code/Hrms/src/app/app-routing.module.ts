import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './common_pages/home/home.component';
import { LoginComponent } from './common_pages/home/login/login.component';
import { RegisterComponent } from './common_pages/home/register/register.component';
import { AboutusComponent } from './management_security-file/aboutus/aboutus.component';
import { BrainComponent } from './management_security-file/brain/brain.component';
import { CardiologyComponent } from './management_security-file/cardiology/cardiology.component';
import { DepartmentComponent } from './management_security-file/department/department.component';
import { DoctorsComponent } from './management_security-file/doctors/doctors.component';
import { KidneyComponent } from './management_security-file/kidney/kidney.component';
import { PatientComponent } from './management_security-file/patient/patient.component';
import { SurgeryComponent } from './management_security-file/surgery/surgery.component';
import { SecureGuardsGuard } from './secure-guards.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'about',component:AboutusComponent},
  {path:'doctor',component:DoctorsComponent,},
  {path:'department',component:DepartmentComponent,canActivate:[SecureGuardsGuard]},
  {path:'patient',component:PatientComponent,canActivate:[SecureGuardsGuard]},
  {path:'heart',component:CardiologyComponent},
  {path:'brain',component:BrainComponent},
  {path:'kindey',component:KidneyComponent},
  {path:'surgery',component:SurgeryComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
