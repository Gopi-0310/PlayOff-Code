import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { WebcameServiceService } from '../service/webcame-service.service';

@Component({
  selector: 'app-webcame',
  templateUrl: './webcame.component.html',
  styleUrls: ['./webcame.component.css']
})
export class WebcameComponent implements OnInit {
  image                : any;
  childComponent       : boolean = false;
  paharantComponent    : boolean = true;
  picture              :any;

  public triggerObservable: Subject<void> = new Subject<void>();

  constructor(private router : Router,public service : WebcameServiceService) { }
  
  ngOnInit(): void {}
  

  

//using web came first install the cdn npm i ngx-webcam --force
public triggerSnapshot(): void {
  this.triggerObservable.next();
  if(this.image != "")
  { 
    this.picture              = this.image;
    this.service.childComponent  = true;
    this.service.paharantComponent = false;
    this.service.imagetrigger = true;
    this.service.icons        = false;
    // this.Click_Event_Child.emit(this.image);   if u want to access this data u need to create pharant component

    // let objToSend: NavigationExtras = {};
    //       objToSend.state = {
    //         Image
    //       };
    // this.router.navigateByUrl('/common', objToSend);
    alert("Your Profile Clicked successfully");
  }
 
}

public handleImage(webcamImage: WebcamImage ): void { this.image = webcamImage.imageAsDataUrl; }

}
