import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { WebcameServiceService } from '../service/webcame-service.service';

@Component({
  selector: 'app-image-caputre',
  templateUrl: './image-caputre.component.html',
  styleUrls: ['./image-caputre.component.css']
})
export class ImageCaputreComponent implements OnInit {
  capturedImage : any;
  imagetrigger  : boolean = false;
  image         : any;
  screenImage   : boolean = false;
  videoUrl      : any;
  
  constructor(private router: Router , public service: WebcameServiceService)
   {
    let currentStateExtras = this.router.getCurrentNavigation()?.extras.state;
    var res = currentStateExtras;
    if(res){this.imagetrigger= true}
   }
   
  ngOnInit(): void {
   
  }
   
  imgclick() {
     this.service.imagetrigger = true; 
     this.service.icons        = true;
    }


}
