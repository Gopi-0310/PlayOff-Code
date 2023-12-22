import { HttpParams } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NavigationModel } from "src/app/model/NavigationModel";
import { LoginModel } from "src/app/model/otpAuthModel";
import { UserData } from "src/app/model/UserData";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Shared } from "src/app/shared/shared";
import { AppConstants } from "src/environments/AppConstants";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-login-otp-verification",
  templateUrl: "./login-otp-verification.component.html",
  styleUrls: ["./login-otp-verification.component.css"],
})
export class LoginOtpVerificationComponent implements OnInit, AfterViewInit {
  navigationModel: NavigationModel = new NavigationModel();
  @ViewChild("otp1") otpInput: ElementRef<HTMLInputElement>;
  loginForm!: FormGroup;
  message: string = "";
  loginModel!: LoginModel;
  userData: UserData = new UserData();

  constructor(
    private router: Router,
    private shared: Shared,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastr :ToastrService
  ) {
    this.navigationModel.closeURL = "/login";
     this.navigationModel.heading = "Login";
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.otpInput.nativeElement.focus();
    }, 0);
  }
  ngOnInit(): void {
    console.log("login  otp component")
    this.loginForm = this.formBuilder.group({
      otp1: ["", [Validators.required]],
      otp2: ["", [Validators.required]],
      otp3: ["", [Validators.required]],
      otp4: ["", [Validators.required]],
    });
  }

/**
 * @param apiEndpointRequst = environment.apiLoginOTPUrl
 * @param model = loginModel
 * @param apicall = postDataToService()
 * In onSubmit() method is used for submitting the loginModel values and make a postDataToService() call
 * In this method having set the ActionMessage to Local Storage .
 */

  onSubmit() {
    if (!this.loginForm.invalid) {
      let actionData = this.localStorageService.getUserActionData();
      let password =
        this.loginForm.value.otp1 +
        this.loginForm.value.otp2 +
        this.loginForm.value.otp3 +
        this.loginForm.value.otp4;

      this.loginModel = {
        username:actionData.data.userName,
        password: password,
      };
      this.auth.showSpinner();
      this.auth
        .postDataToService(environment.apiLoginOTPUrl, this.loginModel)
        .subscribe((apiResponse: any) => {
          this.auth.hideSpinner();
          if (apiResponse.apiStatus.statusCode == 200) {
            localStorage.setItem("authToken", apiResponse.token);
            this.userData.setUserName(
              actionData.data.userName
            );
            this.localStorageService.setUserData(this.userData);
            this.router.navigateByUrl("/teamlist");
          } 
          else {
            this.message = apiResponse.apiStatus.token;
          }
        });
    }
  }

/**
 * @param apiEndpointRequst = environment.apiLoginUrl
 * @param queryparams = userName
 * @param apicall = getDataFromService()
 * In reSendOTP() method is used for sending the OTP to user MobileNumber and 
   submitting the loginForm value(OTP) and make a getDataFromService() call.
 */

  reSendOTP() {
    this.loginForm.reset();
    let actionData = this.localStorageService.getUserActionData();
    this.message = "";
    
    let queryParams = new HttpParams().append(
      "userName",
      actionData.data.userName
    );
    this.auth
      .getDataFromService(environment.apiLoginUrl, queryParams)
      .subscribe((res) => {
        this.toastr.info(res.apiStatus.message,"",AppConstants.toastMessage)
      });
  }

  move(first: any, second: any, third: any, fourth: any) {
    this.shared.move(first, second, third, fourth);
  }
  pressEnterToSubmit(event: any) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }
  key(event: any) {
    this.shared.keyPress(event);
  }
  @HostListener("paste", ["$event"]) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}
