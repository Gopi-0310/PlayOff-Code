import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  signup_boolean: any;

  constructor() { }

  ngOnInit(): void {
  }
  Received(data: any) {
    this.signup_boolean = data;
    console.log("this data",data)
  }
}
