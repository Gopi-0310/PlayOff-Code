import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { SignUpModel } from 'src/app/model/signUpModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';
import { AppConstants } from 'src/environments/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit, AfterViewInit {
  navigationModel: NavigationModel = new NavigationModel();
  @ViewChild('otp1') otpInput: ElementRef<HTMLInputElement>;
  userName = ''
  signUpForm!: FormGroup;
  var: any;
  signUpModel!: SignUpModel
  message: string = "";
  step1: boolean = true;
  constructor(private router: Router,
    private shared: Shared, 
    private auth: AuthService,
    public localStorageService: LocalStorageService, 
    private formBuilder: FormBuilder,
    private toastr :ToastrService
    ) {
    this.navigationModel.closeURL = '/signup';
    this.navigationModel.heading = 'Sign up';
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.otpInput.nativeElement.focus();
    }, 0)
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]]
    });
  }
 /**
 * @param apiEndpointRequst = environment.apiSignupOTPUrl
 * @param model = signUpModel
 * @param apicall = postDataToService()
 * In onSubmit() method is used for submitting the signUpForm Data(OTP) and make a postDataToService() call
 * onSubmit() has Userdata to store the LocalStorage
 */
  onSubmit() {
    let otpData = this.signUpForm.value.otp1 + this.signUpForm.value.otp2 + this.signUpForm.value.otp3 + this.signUpForm.value.otp4

    if (!this.signUpForm.invalid) {
      
      let actionData = this.localStorageService.getUserActionData();
      actionData.data.otp = otpData;
      this.localStorageService.setUserActionData(actionData);
      
      this.signUpModel = { username: actionData.data.userNameWithCountryCode, password: otpData }
      this.auth.showSpinner();
      this.auth.postDataToService(environment.apiSignupOTPUrl, this.signUpModel).subscribe((apiResponse: any) => {
        this.auth.hideSpinner();
         if(apiResponse.apiStatus.statusCode == 200){
          if(apiResponse.apiStatus.playerInvited == true){
            this.localStorageService.setUserFirstAndLastName(apiResponse.apiStatus.playerFirstName,apiResponse.apiStatus.playerLastName)
            this.router.navigateByUrl('/team-invitation'); 
          }else{
            this.toastr.success(apiResponse.apiStatus.message,'',AppConstants.toastMessage)
            this.router.navigateByUrl('/role');
          }
         }
         else{
          this.message = apiResponse.apiStatus.message;
         } 
         
      });
    }

  }
 /**
 * @param apiEndpointRequst = environment.apiSignupUrl
 * @param queryparams = queryParams
 * @param apicall = getDataFromService()
 * In reSendOTP() method is used for sending the OTP to user MobileNumber and 
   submitting the signUpForm Data(OTP) and make a getDataFromService() call.
 * Using Toaster to show the action message  
 */
  reSendOTP() {
    this.signUpForm.reset();
    this.message = "";
    
    let queryParams = new HttpParams().append("userName", this.localStorageService.getUserActionData().data.userNameWithCountryCode);
    this.auth.getDataFromService(environment.apiSignupUrl, queryParams).subscribe(res => {
      this.toastr.info(res.apiStatus.message,"",AppConstants.toastMessage)
      
    });
  }
  pressEnterToSubmit(event: any) {
    if (event.keyCode === 13) {
      this.onSubmit()
    }
  }
  move(first: any, second: any, third: any, fourth: any) {
    this.shared.move(first, second, third, fourth)
  }
  key(event: any) {
    this.shared.keyPress(event);
  }
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}