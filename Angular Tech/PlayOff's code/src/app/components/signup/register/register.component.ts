import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean;
  signUpForm!: FormGroup;
  message: string = "";
  constructor(
    private router: Router,
    private shared: Shared,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    public localStorageService: LocalStorageService,
    private toastr:ToastrService
  ) { }
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      countryCode: ['91-'],
      username: ['',
        [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }
  /**
  * @param apiEndpointRequst = environment.apiSignupUrl
  * @param queryparams = userNameWithCountryCode
  * @param apicall = getDataFromService()
  * In onSubmit() method is used for submitting the signUpForm value(Mobile Number) and make a getDataFromService() call
 */
  onSubmit() {
    const data = this.signUpForm.value;
    var userNameWithCountryCode = data.countryCode + data.username;
    let queryParams = new HttpParams().append("userName", userNameWithCountryCode);
    if (!this.signUpForm.invalid) {
      this.auth.showSpinner();
      this.auth.getDataFromService(environment.apiSignupUrl, queryParams).subscribe(apiresponse => {
        this.auth.hideSpinner();
        if (apiresponse.apiStatus.statusCode == 200) {
          this.localStorageService.setUserActionData({
            actionName: 'signupAction',
            data: {
              'userNameWithCountryCode': userNameWithCountryCode,
              'mobileNumber': data.username,
              'countryCode': data.countryCode
            }
          });
          this.router.navigateByUrl('/otpVerification')
        } else {
          this.submitted = true
          this.message = apiresponse.apiStatus.message;
        }
      });
    }
  }
  pressEnterToSubmit(event: any) {
    if (event.keyCode === 13) {
      this.onSubmit()
    }
  }
  key(event: any) {
    this.shared.keyPress(event);
  }
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}