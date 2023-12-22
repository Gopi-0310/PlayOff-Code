import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/serviceCall/service.service';
// import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentStateExtras:any;
  signup_boolean: any;
  locationLatitude:number =11.017363;
  locationLongtitude:number =76.958885;

  constructor(private service: ServiceService,private router:Router) { 

  }

  ngOnInit(): void {
   
  }
  Received(data: any) {
    this.signup_boolean = data;
    console.log("this data",data)
  }
  category(res:any){
    this.service.departMent = res;
    this.router.navigateByUrl('/heart');
  }
  
}
