import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { RegisterUserModel } from 'src/app/model/registerUserModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppConstants } from 'src/environments/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css']
})
export class JoinTeamComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();
  registerUserModel!: RegisterUserModel;
  inviteForm!: FormGroup;
  actionData: any
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  isChecked = true;
  constructor(
     public localStorageService:LocalStorageService,
     private formBuilder:FormBuilder,
     private auth:AuthService,
     private router :Router,
     private toastre:ToastrService
     ) 
     {
    this.actionData = this.localStorageService.getUserActionData();
    this.navigationModel.closeURL = '/login';
    this.navigationModel.heading = 'Join Team';
    
    this.registerUserModel = {
      username: this.actionData.data.userNameWithCountryCode,
      firstName: this.localStorageService.getUserFirstName(),
      lastName: this.localStorageService.getUserLastName(),
      mobileNumber: this.actionData.data.mobileNumber,
      password: this.actionData.data.otp,
      userRole: "player"
    }
  }

  ngOnInit(): void {
    this.inviteForm = this.formBuilder.group({
      terms: ['',[Validators.requiredTrue]],
    });
    let actionData = this.localStorageService.getUserActionData();
    this.localStorageService.setUserActionData({
      actionName:AppConstants.signupInviteNavigation,
        data: actionData.data
    })
    
  }
   /**
  * @param apiEndpointRequst = environment.apiSaveUser
  * @param Model = registerUserModel
  * @param apicall = postDataToService()
  * In onSubmit() method is used for submitting the registerUserModel values  and make a postDataToService() call
  * onSubmit() has Userdata to store the LocalStorage
 */
  onSubmit() {
    if(!this.inviteForm.invalid){
    this.auth.showSpinner();
    this.auth.postDataToService(environment.apiSaveUser, this.registerUserModel).subscribe((apiResponse: any) => {
      if (apiResponse.apiStatus.statusCode == 200) {
        localStorage.setItem("authToken", apiResponse.token);
        this.localStorageService.setUserName(this.actionData.data.userNameWithCountryCode);
        this.toastre.success(AppConstants.createAccount,"",AppConstants.toastMessage)
        this.router.navigateByUrl('/teamlist')
      }
    });
  }
}
}
