import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/model/register';
import { ServiceService } from 'src/app/serviceCall/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pation-details',
  templateUrl: './pation-details.component.html',
  styleUrls: ['./pation-details.component.css']
})
export class PationDetailsComponent implements OnInit {
  details: any;
  registerModel!: Register;
  currentStateExtras: any;
  userApplication: any;
  adminApplication: any;
  user:boolean=false;
  admin:boolean=false;
  condition:string="";
  constructor(private router: Router,private service :ServiceService) {
    this.currentStateExtras = this.router.getCurrentNavigation()?.extras.state;


  }

  ngOnInit(): void {
    if (this.currentStateExtras.web == "user") {
      console.log(this.currentStateExtras.web)
      this.user=true;
      this.admin=false;
      this.userApplication = this.currentStateExtras;
    } else if (this.currentStateExtras.admin == "admin") {
      console.log(this.currentStateExtras.admin)
      this.user=false;
      this.admin=true;
      this.adminApplication = this.service.serviceGetMethod(environment.apiUrlSignup)
    }
    this.condition = "check_Out";
    localStorage.setItem('accessBoolean_check_Out',this.condition)
  }
  
}
