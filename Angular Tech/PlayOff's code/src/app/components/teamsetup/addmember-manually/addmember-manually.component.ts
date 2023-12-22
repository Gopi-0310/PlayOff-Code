import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { compare, compose, RxwebValidators } from "@rxweb/reactive-form-validators";
 
import { ToastrService } from "ngx-toastr";
import { AddPlayerModel } from "src/app/model/addPlayerModel";
import { NavigationModel } from "src/app/model/NavigationModel";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Shared } from "src/app/shared/shared";
import { AppConstants } from "src/environments/AppConstants";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-addmember-manually",
  templateUrl: "./addmember-manually.component.html",
  styleUrls: ["./addmember-manually.component.css"],
})
export class AddmemberManuallyComponent implements OnInit {
 
  navigationModel: NavigationModel = new NavigationModel();
  onSubmitValidation: boolean;
  clickAdd:boolean
  clickSubmit:boolean
  addPlayerForm!: FormGroup;
  addPlayerModel: AddPlayerModel[] = [];
  action: string;
  teamID: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private shared: Shared,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {
    this.navigationModel.backURL = "/teamsetup/addmembers";
    this.navigationModel.heading = "Add Member";
    this.navigationModel.function = this.addMemeberSubmit;
    if(this.localStorageService.getUserActionData().actionName && this.localStorageService.getUserActionData().actionName == AppConstants.createAnotherAction){
      if(this.localStorageService.getUserActionData().data && this.localStorageService.getUserActionData().data.teamID){
        this.action = AppConstants.createAnotherAction;
        this.teamID = this.localStorageService.getUserActionData().data.teamID
      }
    }
   
  }

  ngOnInit(): void {
    
    this.addPlayerForm = this.formBuilder.group({
      members: this.formBuilder.array([
        this.formBuilder.group({
          firstName: ["", [Validators.required]],
          lastName: [""],
          countryCode: ["91-"],
          mobile: [
            "",
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              RxwebValidators.unique()],
          ],
          email: [""],
        }),
      ]),
    });
  }


  /**
  **** Adding Multiple player ****
  In addAnotherMember() method is used for creating new FormArray value "<FormArray>this.addPlayerForm.controls["members"];"
  */
  addAnotherMember() {
    this.clickAdd = true
    this.clickSubmit = false
    let control = <FormArray>this.addPlayerForm.controls["members"];
    control.push(
      this.formBuilder.group({
        firstName: ["", [Validators.required]],
        lastName: [""],
        countryCode: ["91-"],
        mobile: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            RxwebValidators.unique()
          ],
        ],
        email: [""],
      })
    );
  }
  /**
  **** Delete the player index ****
  In removePlayer(index: any) method is used for delete the FormArray index "<FormArray>this.addPlayerForm.controls["members"];"
  */
  removePlayer(index: any) {
    
    let control = <FormArray>this.addPlayerForm.controls["members"]; 
      control.removeAt(index)
      this.addPlayerModel.splice(index)   
  }
  get members() {
    return this.addPlayerForm.get("members") as FormArray;
  }


  /**
  * @param apiEndpointRequst = environment.apiAddPlayer
  * @param model = addPlayerModel
  * @param header = auth tocken
  * @param apicall = postDataToServiceWithToken() 
  1.In addMemeberSubmit(data: any) method is used for submitting the addPlayerForm values and make a postDataToServiceWithToken() with the help of auth token service call
  */
  addMemeberSubmit(data: any) {
    let component = data.addmemberManuallyComponent;
    component.clickAdd = false
    component.clickSubmit = true
    if (!component.addPlayerForm.invalid) {
      let currentTeamID = '';
      if(component.action == AppConstants.createAnotherAction && component.teamID != '')
          {
            currentTeamID = component.teamID;
          }else{
            currentTeamID = component.localStorageService.getUserTeamID();
          }
      for (let i = 0; i < component.addPlayerForm.value.members.length; i++) {
        component.addPlayerModel[i] = {
          teamId: currentTeamID,
          firstName: component.addPlayerForm.value.members[i].firstName,
          lastName: component.addPlayerForm.value.members[i].lastName,
          emailAddress: component.addPlayerForm.value.members[i].email.toLowerCase(),
          memberRole: component.addPlayerForm.value.members[i].memberRole ="player",
          isManager: false,
          mobileNumber:
            component.addPlayerForm.value.members[i].countryCode +
            component.addPlayerForm.value.members[i].mobile,
          userName: component.localStorageService.getUserName(),
        };
      }
      component.auth
        .postDataToServiceWithToken(
          environment.apiAddPlayer,
          component.addPlayerModel,
          Headers
        )
        .subscribe((apiResponse: any) => {
          if (apiResponse.apiStatus.statusCode == 200) {
            component.toastr.success(AppConstants.addTeamMember,"",AppConstants.toastMessage);
            component.router.navigateByUrl("teamsetup/addschedule");
          }
         
        });
    }
    else {
      component.addPlayerForm.markAllAsTouched();
    }
  }

  omit_special_char(event: any) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }
  key(event: any) {
    this.shared.keyPress(event);
  }
}
