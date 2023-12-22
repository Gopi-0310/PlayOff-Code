import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserData } from 'src/app/model/UserData';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';
import { AppConstants } from 'src/environments/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean
  loginForm!: FormGroup;
  message: string = "";
  userData: UserData = new UserData();
  constructor(
    private router: Router,
    private shared: Shared,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {
    if (this.localStorageService.getUserName()) {
      this.router.navigateByUrl('/teamlist');
    }
  }

  ngOnInit(): void {
    console.log("login component")
    this.loginForm = this.formBuilder.group({
      countryCode: ['91-'],
      username: ['',
        [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  /**
  * @param apiEndpointRequst = environment.apiLoginUrl
  * @param queryparams = let parameters = { "userName": userName };
  * @param apicall = getDataFromService()
  * In onSubmit() method is used for submitting the loginForm value(Mobile Number) and make a getDataFromService() call
  * onSubmit() has Userdata to store the LocalStorage
 */
  onSubmit() {
    this.submitted = true
    let userName = this.loginForm.value.countryCode + this.loginForm.value.username;
    let parameters = { "userName": userName };
    let queryParams = new HttpParams({ fromObject: parameters });
    if (!this.loginForm.invalid) {
      this.auth.showSpinner();
      this.auth.getDataFromService(environment.apiLoginUrl, queryParams).subscribe(apiresponse => {
        this.auth.hideSpinner();
        if (apiresponse.apiStatus.statusCode == 200) {
          this.localStorageService.setUserActionData({
            actionName: 'loginAction',
            data: {
              'userName': this.loginForm.value.countryCode + this.loginForm.value.username
            }
          });
          this.router.navigateByUrl('/loginotpVerification')
        } else {
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
