import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  signup_boolean: any;

  constructor() { }

  ngOnInit(): void {
  }
  Received(data: any) {
    this.signup_boolean = data;
    console.log("this data",data)
  }
}
