import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  signup_boolean: any;

  constructor() { }

  ngOnInit(): void {
  }
  Received(data: any) {
    this.signup_boolean = data;
    console.log("this data",data)
  }
}
