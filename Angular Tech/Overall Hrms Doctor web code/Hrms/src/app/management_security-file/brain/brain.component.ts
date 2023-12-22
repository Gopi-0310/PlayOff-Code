import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/serviceCall/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brain',
  templateUrl: './brain.component.html',
  styleUrls: ['./brain.component.css']
})
export class BrainComponent implements OnInit {
  response:any;
  departMent:string ='Ophthalmologist';
  constructor(private service:ServiceService) { }

  ngOnInit(): void {
    let queryParams = new HttpParams().append("specialist",this.departMent);
    this.service.display_get_method(environment.clientSide.apiDoctorsList,queryParams).subscribe(res => {
      this.response = res;
      
    })
  }

}
