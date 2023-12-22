import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message='';

  constructor() { }

  ngOnInit(): void {
  }
  login(){
    this. message="login"
  }
  register(){
    this. message="register"
  }
}
