import { Component, TemplateRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AddGame } from "src/app/model/addGameModel";
import { AuthService } from "src/app/services/auth.service";
import { Shared } from "src/app/shared/shared";
import { environment } from "src/environments/environment";
import {
  Appearance,
  Location,
} from "@angular-material-extensions/google-maps-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { GameassignmentsComponent } from "./gameassignments/gameassignments.component";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from "@angular/material/core";
import { formatDate } from "@angular/common";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { NavigationModel } from "src/app/model/NavigationModel";
import { GameModel } from "src/app/model/GameModel";
import { AppConstants } from "src/environments/AppConstants";
import { DurationComponent } from "../duration/duration.component";
import { OpponentComponent } from "./opponent/opponent.component";

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
  selector: "app-addgames",
  templateUrl: "./addgames.component.html",
  styleUrls: ["./addgames.component.css"],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class AddgamesComponent implements OnInit {

  teamName: string ;
  contactPersonName:string;
  countryCode = '91-' ;
  mobileNo:string;
  emailAddress:string;

  durationHours:string;
  durationMinutes:string;
  durationHoursList:any;
  durationMinutesList:any;
  durationTotal: string ='';
  action = "game"

  navigationModel: NavigationModel = new NavigationModel();
  gameModel: GameModel = new GameModel();

  minDate = new Date();
  gameAssignmentLength: number;
  customAssignmentsLength: number;
  customData: { check: String; selected: boolean }[] = [];
  totalLength: number;
  defaultData: string[] = [];
  mapAddress = "";
  public appearance = Appearance;
  public latitude!: number;
  public longitude!: number;
  timezoneList: any = [];
  addGameForm!: FormGroup;
  opponentForm!: FormGroup;
  checked = true;
  GameList: any;
  GameModel!: AddGame;
  assignments = new FormControl("");
  isHidden = true;
  arriveEarlyList: any;
  notifyTeam: false;
  gameDetails: any;
  gamDate: any;
  opponetSubmit: boolean = false
  isGameEditing: boolean = false;
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private shared: Shared,
    private router: Router,
    private matdialog: MatDialog,
    public localStorageService: LocalStorageService,
  ) {
    this.navigationModel.backURL = "/teamsetup/addschedule";
    this.navigationModel.heading = "Add Game";
    this.navigationModel.function = this.addGame;

    if (
      this.localStorageService.getUserActionData().actionName ==
      AppConstants.editAction &&
      this.localStorageService.getUserActionData().data.gameid &&
      this.localStorageService.getUserActionData().data.gameid != ""
    ) {
      this.navigationModel.backURL = "/teams/teamschedule";
      this.navigationModel.heading = "Edit Game";
      this.isGameEditing = true;
    }

  }

  ngOnInit(): void {
    this.initGamePage();

    this.addGameForm = this.formBuilder.group({
      timezone: ["", [Validators.required]],
      gameDate: ["", [Validators.required]],
      gameTime: ["", [Validators.required]],
      gameTimeToBeDecide: [""],
      gameOpponentData: ["", [Validators.required]],
      location: ["", [Validators.required]],
      locationDetails: [""],
      gameAssignments: [""],
      gameTeamType: [""],
      gameDurationHours: [""],
      gameDurationMinutes: [""],
      arriveEarlyInfo: [""],
      gameNotes: [""],
    });

    this.opponentForm = this.formBuilder.group({
      teamName: ["", Validators.required],
      contactPersonName: ["", Validators.required],
      countryCode: ["91-", Validators.required],
      mobileNo: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      emailAddress: [""],
    });
  }

/**
  * @param apiEndpointRequst = environment.apiTimezone,apiGameAssignmets,apiArriveduration,
  * @param header = auth tocken
  * @param apicall = getListOfData() 
  In initGamePage(). which is having getListOfData() with a help of auth tocken  
  service call for getting gameDurationHours,gameArriveEarlyInfo,gameDurationMinutes,apiGameAssignmets,timezoneList
  */
  initGamePage() {
    this.auth
      .getListOfData(environment.apiTimezone, Headers)
      .subscribe((timezoneResponse) => {
        this.timezoneList = timezoneResponse.responseData.timeZones;
      });
    this.auth
      .getListOfData(environment.apiGameAssignmets, Headers)
      .subscribe((GameResponse) => {
        this.GameList = GameResponse.responseData.gameAssignments;
        this.GameList.forEach(
          (game: { checked: string }) => (game.checked = "")
        );
        this.shared.setGameAssignments(this.GameList);
      });

    this.auth
      .getListOfData(environment.apiArriveduration, Headers)
      .subscribe((res) => {
        this.arriveEarlyList =
          res.responseData.gameDurationArriveEarlyInfoList.gameArriveEarlyInfo;
        this.durationHoursList =
          res.responseData.gameDurationArriveEarlyInfoList.gameDurationHours;
        this.durationMinutesList =
          res.responseData.gameDurationArriveEarlyInfoList.gameDurationMinutes;
      });

    /**** View GameDetails ****
  * @param apiEndpointRequst = environment.apiGetGameDetailsById
  * @param header = auth tocken
  * @param apicall = getListOfData() 
    In "this.isGameEditing" condition used for getting the backent existing game details  and make a getListOfData() with the help of auth tocken service call
    */
    if (this.isGameEditing) {
      this.auth.showSpinner();
      var editGameParams = `?gameId=${this.localStorageService.getUserActionData().data.gameid
        }`;
      this.auth
        .getListOfData(
          environment.apiGetGameDetailsById + editGameParams,
          Headers
        )
        .subscribe((res) => {
          this.auth.hideSpinner();
          this.gameModel = res.responseData.gameDetails;
          this.addGameForm.get('gameDate').setValue(new Date(
            res.responseData.gameDetails.gameDate
          ));
          this.gameModel.removedAssignments = res.responseData.gameDetails.gameAssignments;
          this.gameModel.teamId = this.localStorageService.getUserTeamID();
          (this.gameModel.userName = this.localStorageService.getUserName()),
            this.gameModel.gameTimeZone =
            res.responseData.gameDetails.gameTimeZone;
          // this.gameModel.gameDate = new Date(
          //   res.responseData.gameDetails.gameDate
          // );
          this.gameModel.gameTime = res.responseData.gameDetails.gameTime;
          this.gameModel.gameTimeToBeDecide =
            res.responseData.gameDetails.gameTimeToBeDecide;

          this.gameModel.location = res.responseData.gameDetails.location;
          this.gameModel.locationDetails =
            res.responseData.gameDetails.locationDetails;

          this.gameModel.gameAssignments =
            res.responseData.gameDetails.gameAssignments;

          this.gameModel.gameTeamType =
            res.responseData.gameDetails.gameTeamType;

            if(res.responseData.gameDetails.gameDurationHours && res.responseData.gameDetails.gameDurationMinutes){
              this.durationHours =
              res.responseData.gameDetails.gameDurationHoursId;
            this.durationMinutes =
              res.responseData.gameDetails.gameDurationMinutesId;
  
              this.durationTotal = res.responseData.gameDetails.gameDurationHours +" " +res.responseData.gameDetails.gameDurationMinutes
            }
          else{
            this.durationTotal=""
          }
          this.gameModel.arriveEarlyInfo =
            res.responseData.gameDetails.gameArriveEarlyId;

          this.gameModel.gameAssignmentsData =
            res.responseData.gameDetails.gameAssignmentsData;

          this.gameModel.gameAssignmentsData.forEach((assignment) => {
            if (assignment.defaultAssignment) {
              this.defaultData.push(assignment.gameAssignmentId);
            } else {
              this.customData.push({
                check: assignment.gameAssignmentName,
                selected: true,
              });
            }
          });
          this.totalLength = this.defaultData.length + this.customData.length;

          this.gameModel.customGameAssignments =
            res.responseData.gameDetails.customGameAssignments;
          this.gameModel.gameNotes = res.responseData.gameDetails.gameNotes;

            this.teamName = res.responseData.gameDetails.gameOpponentData.teamName;
            this.contactPersonName = res.responseData.gameDetails.gameOpponentData.contactPersonName;
           
            this.mobileNo = res.responseData.gameDetails.gameOpponentData.mobileNo;
            this.emailAddress = res.responseData.gameDetails.gameOpponentData.emailAddress

          if (
            res.responseData.gameDetails.gameOpponentData.mobileNo.indexOf(
              "91-"
            ) != -1
          ) {
            this.countryCode =
              res.responseData.gameDetails.gameOpponentData.mobileNo.substring(
                0,
                3
              );
            this.mobileNo =
              res.responseData.gameDetails.gameOpponentData.mobileNo.substring(
                3
              );
          } else {
            this.countryCode =
              res.responseData.gameDetails.gameOpponentData.mobileNo.substring(
                0,
                2
              );
            this.mobileNo =
              res.responseData.gameDetails.gameOpponentData.mobileNo.substring(
                2
              );
          }

          this.gameModel.location = res.responseData.gameDetails.location;
         
        });
    }
  }
  onLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.gameModel.gameLatitude = this.latitude.toString()
    this.gameModel.gameLongitude = this.longitude.toString()

  }
  onAutocompleteSelected(result: PlaceResult) {
    this.gameModel.location = result.name + "," + result.formatted_address;
  }

  notifyTeamSelect(data: any) {
    if (data) {
      this.gameModel.notifyTeam = "yes";
    } else {
      this.gameModel.notifyTeam = "no";
    }
  }

  opponentFormSubmit() {
    if (this.opponentForm.valid) {
      this.matdialog.closeAll();
      this.opponetSubmit = true
    }
  }
  opponentPopupClose() {
    if (this.opponetSubmit != true && !this.isGameEditing) {
      this.opponentForm.controls['teamName'].reset()
      this.opponentForm.controls['contactPersonName'].reset()
      this.opponentForm.controls['mobileNo'].reset()
      this.opponentForm.controls['emailAddress'].reset()
    }
    
  }
/**
  1.In addGame(data: any) method is used for submitting the addGameForm values to store the gameModel 
  2.while submiting addGameForm .It will call navigationModel.function
  3.In addGame(data: any) has createGame()method and updateGame()method based on the condition 
  */
  addGame(data: any) {
    let component = data.addgamesComponent;
    if (!component.addGameForm.invalid) {
      let dateString: string = new Date(
        component.addGameForm.value.gameDate
      ).toDateString();
      dateString = dateString.substring(4);
      let regExp = /(\w+)\s(\w+)\s(\w+)/;
      var newDate = dateString.replace(regExp, "$2-$1-$3");

      let customAssignemtns: string[] = [];
      if (component.customData && component.customData.length > 0) {
        component.customData.forEach((customData: { check: string }) => {
          customAssignemtns.push(customData.check.valueOf());
        });
      }
      component.gameModel.gameDate = newDate;
      component.gameModel.customGameAssignments = customAssignemtns;
      component.gameModel.gameAssignments = component.defaultData;

      let currentTeamId = component.localStorageService.getUserTeamID();
      let teamID = component.localStorageService.getUserActionData().data ? component.localStorageService.getUserActionData().data.teamID : '';

      if (component.localStorageService.getUserActionData().actionName == AppConstants.createAnotherAction
        && teamID && teamID != '') {
        currentTeamId = teamID;
      }
      component.gameModel.teamId = currentTeamId;

      component.gameModel.userName =
        component.localStorageService.getUserName();

        component.gameModel.gameOpponentData ={
          teamName: component.teamName,
          contactPersonName: component.contactPersonName,
        mobileNo:
           component.countryCode +
           component.mobileNo,
          emailAddress: component.emailAddress,
    }
    component.gameModel.gameDurationHours = component.durationHours;
    component.gameModel.gameDurationMinutes = component.durationMinutes; 
   
      

      if (component.isGameEditing) {
        component.gameModel.gameId =
          component.localStorageService.getUserActionData().data.gameid;
        component.updateGame(component.gameModel);
        return;
      }
      component.createGame(component.gameModel);
    } else {
      component.addGameForm.markAllAsTouched();
    }
  }
/**
  **** Create a new Game ****
  * @param apiEndpointRequst = environment.apiAddGame
  * @param header = auth tocken
  * @param model = gameModel
  * @param apicall = postDataToServiceWithToken() 
  1.In createGame(gameModel: GameModel) method is used for submitting the GameModel values and make a postDataToServiceWithToken() with the help of auth tocken service call
  2.onSubmit() has Userdata to store the LocalStorage
  */
  createGame(gameModel: GameModel) {
    this.auth.showSpinner();
    this.auth
      .postDataToServiceWithToken(environment.apiAddGame, gameModel, Headers)
      .subscribe((responseData) => {
        this.auth.hideSpinner();
        if (responseData.apiStatus.statusCode == 200) {
          if (
            this.localStorageService.getUserActionData().actionName ==
            AppConstants.editAction || this.localStorageService.getUserActionData().actionName ==
            AppConstants.createAnotherActionFromTopAdd
          ) {
            // Login Workflow
            this.localStorageService.setActionMessage(AppConstants.createGameLogin)
            this.router.navigateByUrl("/teams/teamschedule");
            return;
          }
          // Signup Workflow
          this.localStorageService.setActionMessage(AppConstants.createGameSignup)
          this.router.navigateByUrl("/teams/teamdashboard");
        }
      });
  }
/**
  **** Update the existing Game ****
  * @param apiEndpointRequst = environment.apiUpdateGame
  * @param header = auth tocken
  * @param model = gameModel
  * @param apicall = postDataToServiceWithToken() 
  1.In updateGame(gameModel: GameModel) method is used for submitting the GameModel values and make a postDataToServiceWithToken() with the help of auth tocken service call
  2.onSubmit() has Userdata to store the LocalStorage
  */
  updateGame(gameModel: GameModel) {
    this.auth.showSpinner();
    this.auth
      .postDataToServiceWithToken(environment.apiUpdateGame, gameModel, Headers)
      .subscribe((res) => {
        this.auth.hideSpinner();
        if (res.apiStatus.statusCode == 200) {
          if (
            this.localStorageService.getUserActionData().actionName ==
            AppConstants.editAction
          ) {
            // Login Workflow
            this.localStorageService.setActionMessage(AppConstants.editGame)
            this.router.navigateByUrl("/teams/teamschedule");
            return;
          }
          // Signup Workflow
          this.router.navigateByUrl("/teams/teamdashboard");
        }
      });
  }

  openAssignmentDialog(): void {
    const assignmentDialog = this.matdialog.open(GameassignmentsComponent, {
      disableClose: true,
      width: "100vw",
      data: {
        userSelectedAssignments: this.defaultData,
        customAssignemnts: this.customData,
      },
    });

    assignmentDialog.afterClosed().subscribe((result) => {
      if(result != undefined){
        this.defaultData = result.gameAssignments;
        this.gameAssignmentLength = result.gameAssignments.length;
        this.customData = [];
        if (result.checkbox) {
          result.checkbox.forEach(
            (customAssignment: { selected: boolean; check: any }) => {
              if (customAssignment.selected == true) {
                this.customData.push(customAssignment);
              }
            }
          );
        }
        this.totalLength = result.gameAssignments.length + this.customData.length;
      }
      
    });
  }

  openOpponentDialog(){ 
    const dialogRef = this.matdialog.open(OpponentComponent, {
        disableClose: true,
        data: {teamName: this.teamName,contactPersonName:this.contactPersonName,countryCode:this.countryCode,mobileNo:this.mobileNo,emailAddress:this.emailAddress}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this.teamName=result.teamName;
          this.contactPersonName=result.contactPersonName;
          this.countryCode=result.countryCode;
          this.mobileNo = result.mobileNo;
          this.emailAddress = result.emailAddress
        }
      });
    }

  openDurationDialog(){
    const dialogRef = this.matdialog.open(DurationComponent, {
      disableClose: true,
        data: {durationHours: this.durationHours,durationMinutes:this.durationMinutes,durationTotal:this.durationTotal, 
          durationHoursList:this.durationHoursList,durationMinutesList:this.durationMinutesList, action:this.action }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this.durationHours = result.durationHours
          this.durationMinutes = result.durationMinutes
          this.durationTotal = result.durationTotal
        }
         
      });
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
