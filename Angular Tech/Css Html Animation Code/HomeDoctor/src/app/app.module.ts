import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './common/register/register.component';
import { LoginComponent } from './common/login/login.component';
import { NavbarComponent } from './Header/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from './serviceCall/service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InformationsModule } from './informations/informations.module';
import { DoctorListComponent } from './common/doctor-list/doctor-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WebcamModule} from 'ngx-webcam';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InformationsModule,
    ToastrModule.forRoot( { 
     
      preventDuplicates:true
    } ),
    WebcamModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
