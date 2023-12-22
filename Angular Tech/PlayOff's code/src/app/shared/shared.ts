import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class Shared {

  public createAccountData: any;

  isNetworkConnected : boolean = true;
  editGameAssignments:any
  navigateUrl = ''
  editScheduleId:string
  userName: string
  countryCode: string
  otp: string
  preUrl=''
  heading = new BehaviorSubject('');
  backUrl = new BehaviorSubject('');
  skipUrl = new BehaviorSubject('');
  password = new BehaviorSubject('');
  mobileNumber = new BehaviorSubject('');
  role =new BehaviorSubject('');
  teamId = new BehaviorSubject('');
  confirmPopup = new BehaviorSubject<any>('')
  changeTopbar = new BehaviorSubject<boolean>(true);
  gameAssignments = new BehaviorSubject<any>('');
  eventAssignments = new BehaviorSubject<any>('')
  setTitle(heading: string) {
    this.heading.next(heading);
  } 
  setBackUrl(backUrl: string) {
    this.backUrl.next(backUrl);
  }
  setSkipUrl(skipUrl: string){
    this.skipUrl.next(skipUrl)
  }
  setMobileNumber(mobileNumber: string){
    this.mobileNumber.next(mobileNumber)
  }
  setTopBar(changeTopbar: boolean){
    this.changeTopbar.next(changeTopbar)
  } 
  setOtp(password:string){
    this.password.next(password)
  }
  setRole(role:string){
    this.role.next(role)
  }
  setTeamId(teamId:string){
    this.teamId.next(teamId)
  }
  setConfirmPopup(popup:boolean){
    this.confirmPopup.next(popup)
  }
  setGameAssignments(assignments:any){
    this.gameAssignments.next(assignments)
  }
  setEventAssignments(eventAssignments:any){
    this.eventAssignments.next(eventAssignments)
  }
  keyPress(event: any) {
    // const pattern = /^[0-9]*$/;
    // let inputChar = String.fromCharCode(event.charCode);
    // if (event.keyCode != 8 && !pattern.test(inputChar)) {
    //   event.preventDefault();
    var regex = new RegExp("^[0-9 ]+$");
    var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(str)) {
        return true;
    }

    event.preventDefault();
    return false;
   
    }
  
  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != "") {
        n.focus();
      }
    }
    if (e.key === "Backspace") {
      if (p != "") {
        p.focus();
      }
    }
  }
  public setFormData(formData: any): void {
    this.createAccountData = formData;
  }

  public getFormData(): any {
    return this.createAccountData;  
  }

  constructor() { }
}