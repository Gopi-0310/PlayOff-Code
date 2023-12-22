import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { RegisterUserModel } from 'src/app/model/registerUserModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';
import { AppConstants } from 'src/environments/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit,OnDestroy  {
  navigationModel: NavigationModel = new NavigationModel();
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  regForm!: FormGroup;
  key:any
  registerUserModel!: RegisterUserModel
  step3: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService,private localStorageService: LocalStorageService,
    public shared:Shared) {
    this.navigationModel.backURL = '/role';
    this.navigationModel.heading = 'Sign up';
  }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      terms: ['', [Validators.requiredTrue]],
      tmNews: ['']
    });
    let actionData = this.localStorageService.getUserActionData();
    this.localStorageService.setUserActionData({
      actionName:AppConstants.signupNavigation,
        data: actionData.data
    });
    this.regForm.patchValue(
      this.shared.getFormData()
    );
  }
   ngOnDestroy(): void {
    console.log("componend ending process");
    this.shared.setFormData(this.regForm.value);
  }
 /**
 * @param apiEndpointRequst = environment.apiSaveUser
 * @param model = registerUserModel
 * @param apicall = postDataToService() 
 * In onSubmit() method is used for submitting the regForm Data and make a postDataToService() call
 * onSubmit() has Userdata to store the LocalStorage
 * Once subscribe the post call it will genarate the auth Token
 */
  onSubmit() {
    if (!this.regForm.invalid) {
      let actionData = this.localStorageService.getUserActionData();
      this.registerUserModel = {
        username: actionData.data.userNameWithCountryCode,
        firstName: this.regForm.value.firstName, 
        lastName: this.regForm.value.lastName,
        mobileNumber: actionData.data.mobileNumber,
        userRole: actionData.data.role,
        password: actionData.data.otp
      }
      this.auth.showSpinner();
      this.auth.postDataToService(environment.apiSaveUser, this.registerUserModel).subscribe((apiResponse: any) => {
        this.auth.hideSpinner();
        if (apiResponse.apiStatus.statusCode == 200) {
          this.localStorageService.setUserRole("owner");
          this.regForm.reset()
          localStorage.setItem("authToken", apiResponse.token);
          this.localStorageService.setUserName(actionData.data.userNameWithCountryCode);
          this.localStorageService.setActionMessage(AppConstants.createAccount);
          this.router.navigateByUrl('/createteam')
        }
      });

    }
  }
  /**
  common validation to use the behaviour subject 
  */
  omit_special_char(event: any) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
    if ((this.key >= 15 && this.key <= 31) ||(this.key >= 33 && this.key <= 64)|| (this.key >= 123) || (this.key >= 96 && this.key <= 105)) {
      event.preventDefault();
    }
  }
}