import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServiceService } from 'src/app/serviceCall/service.service';
import { environment } from 'src/environments/environment';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  signup_boolean: any;
  page: any;
  tableSize: any;
  response: any;
  p: number = 1;
  in_memory_storage1: any;
  searchText: any;
  capturedImage: any;
  imagetrigger: boolean = false;
  //npm i ng2-search-filter install then only  search works
  public triggerObservable: Subject<void> = new Subject<void>();
  constructor(public service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service.display_get_method(environment.clientSide.apiDoctorsList).subscribe(res => {
      this.response = res;
      this.in_memory_storage1 = localStorage.getItem("accessKey");
    })

  }
  Received(data: any) {
    this.signup_boolean = data;
  }

  // paginator(event: any) {
  //   this.page = event;
  // }

  // pageSize(event: any) {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  // }
  doctor(data: string) {
    this.service.login_data.drName = data;
    this.service.display_put_method(environment.clientSide.apiEndPoints + '/' + this.service.login_data.id, this.service.login_data).subscribe(res => {
      this.router.navigateByUrl('/home');
    })
  }

  //using web came first install the cdn npm i ngx-webcam --force
  public triggerSnapshot(): void {
    this.triggerObservable.next();
    this.imagetrigger = false;
   
  }
  public handleImage(webcamImage: WebcamImage ): void {
    // Do something with the captured image, for example:
    console.log("img details",webcamImage);
    this.service.login_data.image = webcamImage.imageAsDataUrl;
    this.service.display_put_method(environment.clientSide.apiEndPoints + '/' + this.service.login_data.id, this.service.login_data).subscribe(res => {
    this.router.navigateByUrl('');
      
    })
    
  }
  


  imgclick() {
    this.imagetrigger = true;
  }
}
