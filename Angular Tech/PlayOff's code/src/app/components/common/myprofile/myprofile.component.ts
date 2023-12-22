import { ThisReceiver } from '@angular/compiler';
import { HostListener, ViewChild } from '@angular/core';
import { Component, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { ProfielDetails } from 'src/app/model/profiel-details';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';
import { AppConstants } from 'src/environments/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  @ViewChild('myDialogs') public templateRef : TemplateRef<any>;
  navigationModel: NavigationModel = new NavigationModel();
  ProfielDetails:ProfielDetails
  profileForm!:FormGroup
  userName:any
  countryCode:any
  message:string="";
  response:string;
  mobileNumber:any
  tempMobile:any
  constructor(private auth :AuthService,
      private matdialog: MatDialog,
      private router: Router,
      public localStorageService: LocalStorageService,
      private formBuilder:FormBuilder,
      private tostre:ToastrService,
      private shared :Shared) {
    this.navigationModel.closeURL = '/teams/teamdashboard';
    this.navigationModel.heading = 'My Profile';
  
  }
  ngOnInit(): void {
    
    this.profileForm = this.formBuilder.group({
      countryCode: ['91-'],
      mobileNo: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      otpNumber : ['',Validators.required ,Validators.minLength(4), Validators.maxLength(4)],
    });
    
      if (this.localStorageService.getUserName().indexOf("91-") != -1) {
        this.countryCode =
        this.localStorageService.getUserName().substring( 0, 3);
        this.mobileNumber =
        this.localStorageService.getUserName().substring(3);
        this.tempMobile = this.mobileNumber
      } else {
        this.countryCode =
        this.localStorageService.getUserName().substring(0,2);
        this.mobileNumber =
        this.localStorageService.getUserName().substring( 2 );
        this.tempMobile = this.mobileNumber
      }
      
  }

  editProfile(){
    if(this.profileForm.value.mobileNo != this.tempMobile){
    let apiMobileUpdateQueryParams =`?userName=${this.profileForm.value.countryCode+this.profileForm.value.mobileNo}`
    this.auth.postDataToServiceWithToken(environment.apiMobileNumberUpdate + apiMobileUpdateQueryParams,Headers).subscribe(response=>{
     if(response.apiStatus.statusCode == 200){
      this.tostre.success(response.apiStatus.message,"",AppConstants.toastMessage)
     this.matdialog.closeAll();
      this.matdialog.open(this.templateRef,
      {
        disableClose: true,
      });
     }else if(response.apiStatus.statusCode == 401){
      this.tostre.success(response.apiStatus.message,"",AppConstants.toastMessage)
     }
    });
  }
  else{
    this.tostre.success("Please enter new mobile number","",AppConstants.toastMessage)
  }
  }

  otpVerify(data:any){
    
    this.ProfielDetails={
      otp:data,firstName: this.localStorageService.getUserFirstName(),lastName:this.localStorageService.getUserLastName() ,username:this.profileForm.value.countryCode+this.profileForm.value.mobileNo ,mobileNumber:this.profileForm.value.mobileNo ,emailAddress:this.localStorageService.getUserActionData().data.emailAddress,oldUserName:this.localStorageService.getUserName() ,isUserNameChanged:"yes" 
    } 
    this.auth.postDataToServiceWithToken(environment.apiPofileUpdate,this.ProfielDetails,Headers).subscribe(ProfileUpdateResponse=>{
      if(ProfileUpdateResponse.apiStatus.statusCode == 200){
       this.matdialog.closeAll();  
       this.tostre.success(ProfileUpdateResponse.apiStatus.message,"",AppConstants.toastMessage);
       
       this.logout()
      }
      else{
        this.response = ProfileUpdateResponse.apiStatus.message;
        this.message = ProfileUpdateResponse.apiStatus.token;
      }
     
    });
  
  }
  resendOtp(reset:any){
   reset.reset();
   this.response="";
   this.editProfile();

  }
  


  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.matdialog.open(templateRef);
  }

  logout() {
    this.localStorageService.clearAllLocalStorage();
    this.router.navigateByUrl('');
  }

  pressEnterToSubmit(event: any) {
    if (event.keyCode === 13) {
      this.editProfile()
    }
  }
  key(event: any) {
    this.shared.keyPress(event);
  }
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}
