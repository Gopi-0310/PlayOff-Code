import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebcamModule} from 'ngx-webcam';
import { WebCameAccessRoutingModule } from './web-came-access-routing.module';
import { WebCameAccessComponent } from './web-came-access.component';
import { ImageCaputreComponent } from './image-caputre/image-caputre.component';
import { WebcameComponent } from './webcame/webcame.component';
import { CommonComponent } from './common/common.component';
import { PictureComponent } from './webcame/picture/picture.component';



@NgModule({
  declarations: [
    WebCameAccessComponent,
    ImageCaputreComponent,
    WebcameComponent,
    CommonComponent,
    PictureComponent
   
  ],
  imports: [
    CommonModule,
    WebCameAccessRoutingModule,
    WebcamModule,
  ],
  
})
export class WebCameAccessModule { }
