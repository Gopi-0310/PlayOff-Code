import { Component, HostListener, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import TeamModel from "src/app/model/TeamModel";
import { NavigationModel } from "src/app/model/NavigationModel";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";

import { Shared } from "src/app/shared/shared";
import { AppConstants } from "src/environments/AppConstants";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-create-team",
  templateUrl: "./create-team.component.html",
  styleUrls: ["./create-team.component.css"],
})
export class CreateTeamComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();
  teamModel: TeamModel = new TeamModel();
  createTeamForm!: FormGroup;

  countryList: any = [];
  sportList: any = [];
  timezoneList: any = [];
  message: string = ''
  isEditingTeam: boolean;
  action: string;
  actionID: string;
  isCreatingAnotherTeam: boolean = false;
  

  constructor(
    public formBuilder: FormBuilder,
    private shared: Shared,
    private router: Router,
    private auth: AuthService,
    public localStorageService: LocalStorageService,
    private toastr:ToastrService,
  ) {
    this.navigationModel.poppupBackUrl="popPupBackUrl";
    this.navigationModel.heading = "Create Team";
    this.navigationModel.function = this.submitForm;
    this.isEditingTeam = false;

    this.action = "";
    this.actionID = "";
    if (this.localStorageService.getUserActionData()) {
      this.action = this.localStorageService.getUserActionData().actionName;
      this.actionID = this.localStorageService.getUserActionData().data
        ? this.localStorageService.getUserActionData().data.teamID
        : "";
    }
    if (this.localStorageService.getActionMessage() == AppConstants.createAccount) {
      this.toastr.success(this.localStorageService.getActionMessage(),"",AppConstants.toastMessage);
      this.localStorageService.setActionMessage("");
    } else {
      localStorageService.getActionMessage();
    }
  }

  ngOnInit(): void {
    this.createTeamForm = this.formBuilder.group({
      teamname: ["", [Validators.required]],
      sports: ["", [Validators.required]],
      zipCode: ["", [Validators.required]],
      timezone: ["", [Validators.required]],
      countryname: ["", [Validators.required]],
    });


  /**
  * @param apiEndpointRequst = environment.apiCountryList,apiSportsList,apiTimezone
  * @param header = auth tocken
  * @param apicall = getListOfData() 
  In ngOnInit(). which is having getListOfData() with a help of auth token  
  service call for getting countryList,sportsList,timezoneList
  */
    this.auth
      .getListOfData(environment.apiCountryList, Headers)
      .subscribe((countryReponse) => {
        this.countryList = countryReponse.responseData.countryList;
      });

    this.auth
      .getListOfData(environment.apiSportsList, Headers)
      .subscribe((sportsResponse) => {
        this.sportList = sportsResponse.responseData.sportsList;
      });

    this.auth
      .getListOfData(environment.apiTimezone, Headers)
      .subscribe((timezoneResponse) => {
        this.timezoneList = timezoneResponse.responseData.timeZones;
      });

    if (this.action == AppConstants.editAction && this.actionID && this.actionID != "") {
      this.isEditingTeam = true;
      this.navigationModel.poppupBackUrl="";
      this.navigationModel.closeURL = '';
      this.navigationModel.backURL = "/teams/myteams";
      this.navigationModel.heading = "Edit Team";
    }
    else if (this.action == AppConstants.createAnotherAction) {
      this.navigationModel.poppupBackUrl="";
      this.isCreatingAnotherTeam = true;
      this.navigationModel.closeURL = '';
      this.navigationModel.backURL = "/teams/myteams";
    }
    else if (this.action == AppConstants.createAnotherActionFromTopAdd) {
      this.navigationModel.poppupBackUrl="";
      this.isCreatingAnotherTeam = true;
      this.navigationModel.closeURL = '';
      this.navigationModel.backURL = "/teams/teamsaddnew";
    }
/**
  **** View existing team ****
  * @param apiEndpointRequst = environment.apiViewTeam
  * @param header = auth tocken
  * @param apicall = getListOfData() 
  In "this.isEditingTeam" condition used for getting the backent existing team data and make a getListOfData() with the help of auth token service call
  */
    if (this.isEditingTeam) {
      let editTeamApiQueryParams = `?teamId=${this.actionID}`;
      this.auth.showSpinner();
      this.auth
        .getListOfData(
          environment.apiViewTeam + editTeamApiQueryParams,
          Headers
        )
        .subscribe((editTeamResponce) => {
          this.auth.hideSpinner();
          this.teamModel.teamName =
            editTeamResponce.responseData.teamData.teamName;
          this.teamModel.sportId =
            editTeamResponce.responseData.teamData.sportsTypeData.sportId;
          this.teamModel.zipCode =
            editTeamResponce.responseData.teamData.zipCode;
          this.teamModel.timeZone =
            editTeamResponce.responseData.teamData.timeZone;
          this.teamModel.country =
            editTeamResponce.responseData.teamData.countryCode;
          this.teamModel.sportName =
            editTeamResponce.responseData.teamData.sportsTypeData.sportName;
        });
    }
  }

/**
  1.In submitForm(data: any) method is used for submitting the createTeamForm values to store the teamModel 
  2.while submiting the createTeamForm.  It will call the navigationModel.function
  3.In submitForm(data: any) has createTeam()method and editTeam()method based on the condition 
  */

  submitForm(data: any) {
    let createTeamComponent = data.createTeamComponent;
    if (!createTeamComponent.createTeamForm.invalid) {
      if (
        (createTeamComponent.createTeamForm.value.zipCode.length == 5 &&
          createTeamComponent.createTeamForm.value.countryname == "US") ||
        (createTeamComponent.createTeamForm.value.zipCode.length == 6 &&
          createTeamComponent.createTeamForm.value.countryname == "IND")
      ) {
        createTeamComponent.teamModel = {
          userName: createTeamComponent.localStorageService.getUserName(),
          teamName: createTeamComponent.createTeamForm.value.teamname,
          sportId: createTeamComponent.createTeamForm.value.sports,
          sportName: createTeamComponent.createTeamForm.value.sportName,
          zipCode: createTeamComponent.createTeamForm.value.zipCode,
          timeZone: createTeamComponent.createTeamForm.value.timezone,
          country: createTeamComponent.createTeamForm.value.countryname,
        };

        if (createTeamComponent.isEditingTeam) {
          createTeamComponent.teamModel.teamId = createTeamComponent.actionID;
          createTeamComponent.editTeam(createTeamComponent.teamModel);
        } else {
          createTeamComponent.createTeam(createTeamComponent.teamModel);
        }
      } else {

        createTeamComponent.message = "Please enter valid pin code";
      }
    } else {
      createTeamComponent.createTeamForm.markAllAsTouched();
    }

  }

 /**
  **** Create a new team ****
  * @param apiEndpointRequst = environment.apiCreateTeam
  * @param header = auth tocken
  * @param model = teamModel
  * @param apicall = postDataToServiceWithToken() 
  1.In createTeam(teamModel: TeamModel) method is used for submitting the TeamModel values and make a postDataToServiceWithToken() with the help of auth tocken service call
  2.createTeam() has Userdata to store the LocalStorage

  */

  createTeam(teamModel: TeamModel) {
    this.auth.showSpinner();
    this.auth
      .postDataToServiceWithToken(environment.apiCreateTeam, teamModel, Headers)
      .subscribe((apiResponse: any) => {
        this.auth.hideSpinner();
        if (apiResponse.apiStatus.statusCode == 200) {
          let teamID = apiResponse.responseData.teamData.teamId;
          let teamName = this.createTeamForm.value.teamname;

          // TODO set proper data in case user is creating new team from Login flow, Else should be fine.
          if (!this.isCreatingAnotherTeam) {
            this.localStorageService.setUserTeam({ teamID, teamName });
            this.localStorageService.setIsManager(true);
          } else {
            this.localStorageService.setUserActionData({
              actionName: AppConstants.createAnotherAction,
              data: { teamID, teamName },
            });
            this.localStorageService.setActionMessage(AppConstants.messageMyTeam);
            this.router.navigateByUrl("/teams/myteams");
            return;
          }
          this.localStorageService.setActionMessage(AppConstants.messageMyTeam);
          this.router.navigateByUrl("/teamsetup/addmembers");
        }else if(apiResponse.apiStatus.exceptionMessage == "Team already exists"){
           this.toastr.info(apiResponse.apiStatus.exceptionMessage,"",AppConstants.toastMessage);
        }
      });
  }

/**
  **** Update the existing team ****
  * @param apiEndpointRequst = environment.apiEditTeam
  * @param header = auth tocken
  * @param model = teamModel
  * @param apicall = postDataToServiceWithToken() 
  1.In editTeam(teamModel: TeamModel) method is used for submitting the TeamModel values and make a postDataToServiceWithToken() with the help of auth tocken service call
  2.createTeam() has Userdata to store the LocalStorage

  */
  editTeam(teamModel: TeamModel) {
    this.auth
      .postDataToServiceWithToken(environment.apiEditTeam, teamModel, Headers)
      .subscribe((editTeamResponse) => {
        if (editTeamResponse.apiStatus.statusCode == 200) {
          //TODO set proper data in case user is creating new team from Login flow, Else should be fine.
          this.localStorageService.setActionMessage(AppConstants.messageEditMyTeam);
          this.router.navigateByUrl("teams/myteams");
        } else {
          alert('error while creating team')
          this.router.navigateByUrl("teams/myteams");
        }
      });
  }
  

  key(event: any) {
    this.shared.keyPress(event);
  }
  @HostListener("paste", ["$event"]) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

}
