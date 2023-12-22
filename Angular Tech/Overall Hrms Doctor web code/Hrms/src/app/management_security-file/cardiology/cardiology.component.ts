import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/serviceCall/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cardiology',
  templateUrl: './cardiology.component.html',
  styleUrls: ['./cardiology.component.css']
})
export class CardiologyComponent implements OnInit {
  response:any;
  
  constructor(private service:ServiceService) { }

  ngOnInit(): void {
    let queryParams = new HttpParams().append("specialist",this.service.departMent);
    this.service.display_get_method(environment.clientSide.apiDoctorsList,queryParams).subscribe(res => {
      this.response = res;
      
    })
  }

}
