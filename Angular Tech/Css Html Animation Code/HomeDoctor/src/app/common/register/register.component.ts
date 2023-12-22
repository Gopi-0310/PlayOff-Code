import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Register } from 'src/app/model/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message = '';
  message1 = '';
  registerModel!: Register;
  registerForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  Login(){
    
  }
}
