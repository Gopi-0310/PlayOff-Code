import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/serviceCall/service.service';
import { environment } from 'src/environments/environment';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  in_memory_storage: any;
  response_data: any;
  logged: any;
  data: any;
 
  constructor(private router: Router, public service: ServiceService) { }

  ngOnInit(): void {

    this.in_memory_storage = localStorage.getItem("accessKey");
    let queryParams = new HttpParams().append("email", this.in_memory_storage);
    this.service.display_get_method(environment.clientSide.apiEndPoints, queryParams).subscribe(res => {

    this.response_data = res;
    console.log("dr name",this.response_data)

    })



  }
  signUp() {
    console.log("ss")
    this.Click_event_child.emit('signup');
    this.ngOnInit();
  }

  @Output()
  Click_event_child: EventEmitter<any> = new EventEmitter();

  edit(data:any){
    this.data = data;
    // this.router.navigateByUrl('/brain');
    // alert("under development")
  }
}
