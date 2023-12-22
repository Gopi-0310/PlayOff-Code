import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './common_pages/home/register/register.component';
import { LoginComponent } from './common_pages/home/login/login.component';
import { HomeComponent } from './common_pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './common_pages/home/navbar/navbar.component';
import { AboutusComponent } from './management_security-file/aboutus/aboutus.component';
import { DoctorsComponent } from './management_security-file/doctors/doctors.component';
import { DepartmentComponent } from './management_security-file/department/department.component';
import { PatientComponent } from './management_security-file/patient/patient.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CardiologyComponent } from './management_security-file/cardiology/cardiology.component';
import { BrainComponent } from './management_security-file/brain/brain.component';
import { KidneyComponent } from './management_security-file/kidney/kidney.component';
import { SurgeryComponent } from './management_security-file/surgery/surgery.component';
import { AgmCoreModule } from '@agm/core';
import { WebcamModule } from 'ngx-webcam';
import { LinkReducePipe } from './custompipe/link-reduce.pipe';
import { ShortUrlPipe } from './pipes/short-url.pipe';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AboutusComponent,
    DoctorsComponent,
    DepartmentComponent,
    PatientComponent,
    CardiologyComponent,
    BrainComponent,
    KidneyComponent,
    SurgeryComponent,
    LinkReducePipe,
    ShortUrlPipe,
    
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates:true
     }),
     BrowserAnimationsModule,
     NgxPaginationModule,
     Ng2SearchPipeModule,
     FormsModule,
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmO7djCKCzJ2Oi6VvJw31MtFw-aqUptvY',
      libraries: ['places']
    }),
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
