import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class shared {
  name = new BehaviorSubject('');
  email = new BehaviorSubject('');
  mobileNumber = new BehaviorSubject('');
  password = new BehaviorSubject('');
  appoinmentTime = new BehaviorSubject('');
  role =new BehaviorSubject('');
  setName(name: string) {
    this.name.next(name);
  } 
  setEmail(email: string) {
    this.email.next(email);
  } 
  setMobileNumber(mobileNumber: string) {
    this.mobileNumber.next(mobileNumber);
  } 
  setTime(appoinmentTime: string) {
    this.appoinmentTime.next(appoinmentTime);
  } 
  constructor() { }

  

}
