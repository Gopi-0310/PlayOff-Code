import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor() { }
  data:any;
  data1:any;
  ngOnInit(): void {
    this.data= {
      name:"gopi",
      age:21,
      specialist:"cardiology"
   }

  }
childToParant(valu:any){
    this.data1 = valu;
}
}
