import { Component, HostListener, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";
import { Shared } from "src/app/shared/shared";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { PlayerModel } from "src/app/model/PlayerModel";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from "@angular/material/core";
import { formatDate } from "@angular/common";
import { NavigationModel } from "src/app/model/NavigationModel";
import { AppConstants } from "src/environments/AppConstants";
import { ToastrService } from "ngx-toastr";

export const PICK_FORMATS = {
  parse: { dateInput: { month: "short", year: "numeric", day: "numeric" } },
  display: {
    dateInput: "input",
    monthYearLabel: { year: "numeric", month: "short" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" },
  },
};
class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === "input") {
      return formatDate(date, "dd-MMM-yyyy", this.locale);
    } else {
      return date.toDateString();
    }
  }
}
@Component({
  selector: "app-addmember",
  templateUrl: "./addmember.component.html",
  styleUrls: ["./addmember.component.css"],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ],
})
export class AddmemberComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();
  playerForm: any;
  playerModel: PlayerModel = new PlayerModel();
  isPlayerEditing: boolean = false;
  hideManagerAccess:boolean=false;
  readOnlyMobileNumber:boolean= false;
  
  maxDate=new Date()
  position =[
    {value:0},{value:1},{value:2}
  ]
    
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private shared: Shared,
    private router: Router,
    public localStorageService: LocalStorageService,
    private toastr :ToastrService
  ) {
    this.navigationModel.backURL = "/teams/teammembers";
    this.navigationModel.function = this.addPlayer;
    this.navigationModel.heading = "Add Member";


    /**
  **** View existing team player ****
  * @param apiEndpointRequst = environment.apieditTeamPlayer
  * @param header = auth tocken
  * @param apicall = getListOfData() 
  In this condition used for getting the backent existing player data and make a getListOfData() with the help of auth tocken service call
  */
    if (
      this.localStorageService.getUserActionData().actionName ==
        AppConstants.editAction &&
      this.localStorageService.getUserActionData().data.memberid &&
      this.localStorageService.getUserActionData().data.memberid != ""
    ) {
      this.navigationModel.heading = "Edit Member";
      this.isPlayerEditing = true;
      let playerIdQuerParams =
        "?playerId=" +
        this.localStorageService.getUserActionData().data.memberid;
        this.auth.showSpinner()

      this.auth
        .getListOfData(
          environment.apieditTeamPlayer + playerIdQuerParams,
          Headers
        )
        .subscribe((responseData) => {
          this.auth.hideSpinner();
          this.playerModel.firstName =
            responseData.responseData.playerDetails.firstName;
          this.playerModel.lastName =
            responseData.responseData.playerDetails.lastName;
          this.playerModel.emailAddress = responseData.responseData.playerDetails.emailAddress
          // this.playerModel.dateOfBirth = responseData.responseData.playerDetails.dateOfBirth ? 
          // new Date(responseData.responseData.playerDetails.dateOfBirth) : '';
          if(responseData.responseData.playerDetails.dateOfBirth){
            this.playerForm.get('dateOfBirth').setValue(new Date(responseData.responseData.playerDetails.dateOfBirth));
          }
          else{
            this.playerForm.get('dateOfBirth').setValue('');
          }
          
          this.playerModel.gender =
            responseData.responseData.playerDetails.gender;
          this.playerModel.zipOrPostalCode =
            responseData.responseData.playerDetails.zipOrPostalCode;
          this.playerModel.memberRole =
            responseData.responseData.playerDetails.memberRole;
          this.playerModel.teamId =
            responseData.responseData.playerDetails.teamId;
            
            this.playerModel.isManager = responseData.responseData.playerDetails.isManager ? responseData.responseData.playerDetails.isManager : false;

          this.playerModel.playerPosition =
            responseData.responseData.playerDetails.playerPosition;

            this.playerModel.mobileNumber = responseData.responseData.playerDetails.mobileNumber

            if (
              responseData.responseData.playerDetails.mobileNumber.indexOf(
                "91-"
              ) != -1
            ) {
              this.playerModel.countryCode =
            responseData.responseData.playerDetails.mobileNumber.substring(
              0,
              3
            );
          this.playerModel.mobileNumberWithoutCountryCode =
            responseData.responseData.playerDetails.mobileNumber.substring(3);
            } else {
              this.playerModel.countryCode =
            responseData.responseData.playerDetails.mobileNumber.substring(
              0,
              2
            );
          this.playerModel.mobileNumberWithoutCountryCode =
            responseData.responseData.playerDetails.mobileNumber.substring(2);
            }

          this.playerModel.jerseyNumber =
            responseData.responseData.playerDetails.jerseyNumber;
          this.playerModel.state =
            responseData.responseData.playerDetails.state;
          this.playerModel.city = responseData.responseData.playerDetails.city;
          this.playerModel.street =
            responseData.responseData.playerDetails.street;
        });
    }
    else if(this.localStorageService.getUserActionData().actionName ==
    AppConstants.createAnotherActionFromTopAdd){
      this.navigationModel.backURL = "/teams/teamsaddnew"
    }
  }
  
  ngOnInit(): void {

    this.playerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: [],
      emailAddress: [],
      countryCode: ["91-", [Validators.required]],
      mobileNumber: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      street: [],
      city: [],
      dateOfBirth: [""],
      gender: [],
      jerseyNumber: [],
      nonPlayerStatus: [""],
      playerPosition: [],
      state: [],
      zipOrPostalCode: [""],
    });
   

   
    if(this.localStorageService.getUserRole() == 'owner'
         &&this.localStorageService.getUserActionData().data.memberRole =='owner' 
         || this.localStorageService.getUserRole() == 'manager'){
        this.hideManagerAccess=true;
     }

   if(this.localStorageService.getUserRole() == 'owner' && this.localStorageService.getUserActionData().data.memberRole =='owner' || this.localStorageService.getUserRole() == 'manager' && this.localStorageService.getUserActionData().data.memberRole =='manager' || this.localStorageService.getUserRole() == 'manager' && this.localStorageService.getUserActionData().data.memberRole =='owner'){
     this.readOnlyMobileNumber =true;
      }
  }

  selectNotifyTeam(data: any) {
    
    if (data) {
      this.playerModel.isManager = true; 
       this.playerModel.memberRole = "manager";
    } else {
      this.playerModel.isManager = false;
      this.playerModel.memberRole = "player";
    }

  }
  
  selectInviteTeam(data: any) {
    if (data) {
      this.playerModel.inviteToJoinStatus = "yes";
   } else {
     this.playerModel.inviteToJoinStatus = "no";
   }
  }
/**
  **** Add new player ****
  * @param apiEndpointRequst = environment.apiAddPlayer
  * @param header = auth tocken
  * @param model = PlayerModel
  * @param apicall = postDataToServiceWithToken() 
  1.In createPlayer(playerModel: PlayerModel) method is used for submitting the PlayerModel values and make a postDataToServiceWithToken() with the help of auth tocken service call
  2.createPlayer() has Userdata to store the LocalStorage
  */
  createPlayer(playerModel: PlayerModel) {
    this.auth.showSpinner();
    this.auth
      .postDataToServiceWithToken(
        environment.apiAddPlayer,
        [playerModel],
        Headers
      )
      .subscribe((apiResponse: any) => {
        this.auth.hideSpinner();
        if (apiResponse.apiStatus.statusCode == 200) {
          this.localStorageService.setActionMessage(AppConstants.messageTeamMember);
          this.router.navigateByUrl("/teams/teammembers");
        }else if(apiResponse.apiStatus.exceptionMessage == "Player already exists"){
          this.toastr.info(apiResponse.apiStatus.exceptionMessage,"",AppConstants.toastMessage)
        }
      });
  }
/**
  **** Update the existing player ****
  * @param apiEndpointRequst = environment.apieditTeamNewPlayer
  * @param header = auth tocken
  * @param model = playerModel
  * @param apicall = postDataToServiceWithToken() 
  1.In editPlayer(playerModel: PlayerModel) method is used for submitting the PlayerModel values and make a postDataToServiceWithToken() with the help of auth tocken service call
  2.editPlayer() has Userdata to store the LocalStorage
  */
  editPlayer(playerModel: PlayerModel) {
    this.auth.showSpinner();
    this.auth
      .postDataToServiceWithToken(
        environment.apieditTeamNewPlayer,
        playerModel,
        Headers
      )
      .subscribe((responseData) => {
        this.auth.hideSpinner();
        if (responseData.apiStatus.statusCode == 200) {
          this.localStorageService.setActionMessage(AppConstants.messageEditTeamMember);
          this.router.navigateByUrl("/teams/teammembers");
        }else if(responseData.apiStatus.message == "Player already exists"){
          this.toastr.info(responseData.apiStatus.message,"",AppConstants.toastMessage)
        }
      });
  }
  teamMember() {
    this.router.navigateByUrl("/teams/teammembers");
  }

  addPlayer(data: any) {
    let component = data.addmemberComponent;
    if (component) {
      if (!component.playerForm.invalid) {
        let mobileNumber =
          component.playerForm.value.countryCode +
          component.playerForm.value.mobileNumber;

        let dateString: string = new Date(
          component.playerForm.value.dateOfBirth
        ).toDateString();
        dateString = dateString.substring(4);

        let regExp = /(\w+)\s(\w+)\s(\w+)/;
        var newDate = dateString.replace(regExp, "$2-$1-$3");
        component.playerModel.emailAddress=component.playerModel.emailAddress?component.playerModel.emailAddress.toLowerCase():''
        component.playerModel.dateOfBirth = component.playerForm.value.dateOfBirth ? newDate : ''
        component.playerModel.userName = component.localStorageService.getUserName();
        component.playerModel.teamId = component.localStorageService.getUserTeamID();
        component.playerModel.memberRole = component.playerModel.memberRole;
        component.playerModel.mobileNumber = component.playerModel.countryCode + component.playerModel.mobileNumberWithoutCountryCode;

       

        if (component.isPlayerEditing) {
          component.playerModel.memberId =
            component.localStorageService.getUserActionData().data.memberid;
          component.editPlayer(component.playerModel);
          return;
        }

        component.createPlayer(component.playerModel);
      } else {
        component.playerForm.markAllAsTouched();
      }
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
  @HostListener("paste", ["$event"]) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}