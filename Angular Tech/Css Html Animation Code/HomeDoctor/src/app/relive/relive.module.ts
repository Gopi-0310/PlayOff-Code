import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReliveRoutingModule } from './relive-routing.module';
import { ReliveComponent } from './relive.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    ReliveComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReliveRoutingModule
  ]
})
export class ReliveModule { }
