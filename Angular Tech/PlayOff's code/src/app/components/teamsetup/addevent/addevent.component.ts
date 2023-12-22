import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AddEvent } from "src/app/model/addEventModel";
import { AuthService } from "src/app/services/auth.service";
import { Shared } from "src/app/shared/shared";
import { environment } from "src/environments/environment";
import {
  Appearance,
  Location,
} from "@angular-material-extensions/google-maps-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;
import { MatDialog } from "@angular/material/dialog";
import { EventassignmentsComponent } from "./eventassignments/eventassignments.component";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from "@angular/material/core";
import { formatDate } from "@angular/common";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { NavigationModel } from "src/app/model/NavigationModel";
import { AppConstants } from "src/environments/AppConstants";
import { EventModel } from "src/app/model/EventModel";
import { DurationComponent } from "../duration/duration.component";

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
  selector: "app-addevent",
  templateUrl: "./addevent.component.html",
  styleUrls: ["./addevent.component.css"],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class AddeventComponent implements OnInit {

  durationHours:string;
  durationMinutes:string;
  durationHoursList:any;
  durationMinutesList:any;
  durationTotal: string ='';
  action = "event";

  navigationModel: NavigationModel = new NavigationModel();
  eventModel: EventModel = new EventModel();

  isTopbarChange = false;
  minDate = new Date();
  eventAssignmentLength: number;
  customAssignmentsLength: number;
  customData: { check: String; selected: boolean }[] = [];
  totalLength: number;
  defaultData: string[] = [];
  mapAddress = "";
  public appearance = Appearance;
  public latitude!: number;
  public longitude!: number;
  addEventModel!: AddEvent;
  checked = true;
  eventList: any;
  timezoneList: any = [];
  addEventForm!: FormGroup;
  assignments = new FormControl("");
  userName: any;
  teamId: any;
  arriveEarlyList: any;
  isHidden = true;
  eventDetails: any;
  isEventEditing: boolean = false;
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private shared: Shared,
    private matdialog: MatDialog,
    public localStorageService: LocalStorageService
  ) {
    this.navigationModel.backURL = "/teamsetup/addschedule";
    this.navigationModel.heading = "Add Event";
    this.navigationModel.function = this.addEvent;

    if (
      this.localStorageService.getUserActionData().actionName ==
        AppConstants.editAction &&
      this.localStorageService.getUserActionData().data.eventid &&
      this.localStorageService.getUserActionData().data.eventid != ""
    ) {
      this.navigationModel.heading = "Edit Event";
      this.navigationModel.backURL = "/teams/teamschedule";
      this.isEventEditing = true;
    }

    /**** View EventDetails ****
    * @param apiEndpointRequst = environment.apiGetEventDetailsById
    * @param model = eventModel
    * @param apicall = getListOfData() 
    In "this.isEventEditing" condition used for getting the backent existing event details  and make a getListOfData() with the help of auth tocken service call
    */
    if (this.isEventEditing) {
      this.auth.showSpinner();
      var editEventParams = `?eventId=${
        this.localStorageService.getUserActionData().data.eventid
      }`;
      this.auth
        .getListOfData(
          environment.apiGetEventDetailsById + editEventParams,
          Headers
        )
        .subscribe((res) => {
          this.auth.hideSpinner();
          this.eventModel = res.responseData.eventDetails;
          this.addEventForm.get('eventDate').setValue(new Date(
            res.responseData.eventDetails.eventDate
          ));
          this.eventModel.removedAssignments = res.responseData.eventDetails.eventAssignments;
          if(res.responseData.eventDetails.eventDurationHoursId && res.responseData.eventDetails.eventDurationHours){
            this.durationHours =
            res.responseData.eventDetails.eventDurationHoursId;
          this.durationMinutes =
            res.responseData.eventDetails.eventDurationMinutesId;

          this.durationTotal = res.responseData.eventDetails.eventDurationHours +" " +res.responseData.eventDetails.eventDurationMinutes
          }
         else{
          this.durationTotal = ""
         }
          
          
          this.eventModel.notifyTeam = res.responseData.eventDetails.notifyTeam
          this.eventModel.eventAssignmentsData.forEach((assignment) => {
            if (assignment.defaultAssignment) {
              this.defaultData.push(assignment.eventAssignmentId);
            } else {
              this.customData.push({
                check: assignment.eventAssignmentName,
                selected: true,
              });
            }
          });

          this.eventModel.eventDurationMinutes = res.responseData.eventDetails.eventDurationMinutesId
          this.eventModel.eventDurationHours = res.responseData.eventDetails.eventDurationHoursId
          this.eventModel.eventLocation = res.responseData.eventDetails.eventLocation
          this.eventModel.arriveEarlyInfo = res.responseData.eventDetails.eventArriveEarlyId
          // this.eventModel.eventDate = new Date(res.responseData.eventDetails.eventDate);
          this.totalLength = this.defaultData.length + this.customData.length;
        });
    }

  }

  ngOnInit(): void {
    this.initEventsPage();
    this.addEventForm = this.formBuilder.group({
      eventName: ["", [Validators.required]],
      eventDate: ["", [Validators.required]],
      eventTime: ["", [Validators.required]],
      eventTimeToBeDecide: [""],
      eventLocation: ["", [Validators.required]],
      eventLocationDetails: [""],
      eventAssignments: [""],
      eventRepeats: ["never"],
      eventDurationHours: [""],
      eventDurationMinutes: [""],
      arriveEarlyInfo: [""],
      eventTimeZone: ["", [Validators.required]],
      eventNotes: [""],
    });
  }
   /**
    * @param apiEndpointRequst = environment.apiTimezone,apiEventAssignments,apiEventduaration
    * @param header = auth tocken
    * @param apicall = getListOfData() 
   In initEventsPage(). which is having getListOfData() with a help of auth tocken  
   service call for getting eventDurationHours,eventArriveEarlyInfo,eventDurationMinutes,,eventAssignments,timezoneList
   */
  initEventsPage() {
    this.auth
      .getListOfData(environment.apiTimezone, Headers)
      .subscribe((timezoneResponse) => {
        this.timezoneList = timezoneResponse.responseData.timeZones;
      });

    this.auth
      .getListOfData(environment.apiEventAssignments, Headers)
      .subscribe((response) => {
        this.eventList = response.responseData.eventAssignments;
        this.eventList.forEach(
          (event: { checked: string }) => (event.checked = "")
        );
        this.shared.setEventAssignments(this.eventList);
      });

    this.auth
      .getListOfData(environment.apiEventduaration, Headers)
      .subscribe((res) => {
        this.durationHoursList =
          res.responseData.eventDurationArriveEarlyInfoList.eventDurationHours;
        this.durationMinutesList =
          res.responseData.eventDurationArriveEarlyInfoList.eventDurationMinutes;
      });

    this.auth
      .getListOfData(environment.apiEventduaration, Headers)
      .subscribe((res) => {
        this.arriveEarlyList =
          res.responseData.eventDurationArriveEarlyInfoList.eventArriveEarlyInfo;
      });
  }
  notifyEventSelect(data: any) {
    if (data) {
      this.eventModel.notifyTeam = "yes";
    } else {
      this.eventModel.notifyTeam = "no";
    }
  }

  /** 
  1.In addEvent(data: any) method is used for submitting the addEventForm values to store the eventModel 
  2.while submitting addEvetForm .It will call navicationModel.Function
  3.In addEvent(data: any) has createEvent()method and updateEvent()method based on the condition 
  */
  addEvent(data: any) {
    let component = data.addeventComponent;

    if (!component.addEventForm.invalid) {
      let dateString: string = new Date(
        component.addEventForm.value.eventDate
      ).toDateString();
      dateString = dateString.substring(4);
      let regExp = /(\w+)\s(\w+)\s(\w+)/;
      var newDate = dateString.replace(regExp, "$2-$1-$3");

      let customAssignments: string[] = [];
      if (component.customData && component.customData.length > 0) {
        component.customData.forEach((cdata: { check: string }) => {
          customAssignments.push(cdata.check.valueOf());
        });
      }
      component.eventModel.eventDate = newDate;
      component.eventModel.customEventAssignments = customAssignments;
      component.eventModel.eventAssignments = component.defaultData;
      component.eventModel.eventDurationHours = component.durationHours;
      component.eventModel.eventDurationMinutes = component.durationMinutes; 

      let currentTeamId = component.localStorageService.getUserTeamID();
      let teamID = component.localStorageService.getUserActionData().data ? component.localStorageService.getUserActionData().data.teamID : '';

      if(component.localStorageService.getUserActionData().actionName == AppConstants.createAnotherAction 
        && teamID && teamID != '')
          {
            currentTeamId = teamID;
          }

      component.eventModel.teamId = currentTeamId;
      component.eventModel.userName =
        component.localStorageService.getUserName();

      if (component.isEventEditing) {
        component.eventModel.eventId =
          component.localStorageService.getUserActionData().data.eventid;
        component.updateEvent(component.eventModel);
        return;
      }
      component.createEvent(component.eventModel);
    } else {
      component.addEventForm.markAllAsTouched();
    }
  }

  /**
  **** Create a new Event ****
  * @param apiEndpointRequst = environment.apiAddEvent
  * @param header = auth tocken
  * @param model = eventModel
  * @param apicall = postDataToServiceWithToken() 
  1.In createEvent(eventModel: EventModel) method is used for submitting the EventModel values and make a postDataToServiceWithToken() with the help of auth tocken service call
  2.onSubmit() has Userdata to store the LocalStorage
  */
  createEvent(eventModel: EventModel) {
    this.auth.showSpinner();
    this.auth
      .postDataToServiceWithToken(environment.apiAddEvent, eventModel, Headers)
      .subscribe((responseData) => {
        this.auth.hideSpinner();
        if (responseData.apiStatus.statusCode == 200) {
          if (
            this.localStorageService.getUserActionData().actionName ==
            AppConstants.editAction || this.localStorageService.getUserActionData().actionName ==
            AppConstants.createAnotherActionFromTopAdd
          ) {
            // Login Workflow
            this.localStorageService.setActionMessage(AppConstants.createEventLogin)
            this.router.navigateByUrl("/teams/teamschedule");
            return;
          }
          // Signup Workflow
          this.localStorageService.setActionMessage(AppConstants.createEventSignup)
          this.router.navigateByUrl("/teams/teamdashboard");
        }
      });
  }
 /**
  **** Update the existing Event ****
  * @param apiEndpointRequst = environment.apiUpdateEvent
  * @param header = auth tocken
  * @param model = eventModel
  * @param apicall = postDataToServiceWithToken() 
  1.In updateEvent(eventModel: EventModel) method is used for submitting the EventModel values and make a postDataToServiceWithToken() with the help of auth tocken service call
  2.onSubmit() has Userdata to store the LocalStorage
  */
  updateEvent(eventModel: EventModel) {
    this.auth.showSpinner();
    this.auth
      .postDataToServiceWithToken(
        environment.apiUpdateEvent,
        eventModel,
        Headers
      )
      .subscribe((responseData) => {
        this.auth.hideSpinner();
        if (responseData.apiStatus.statusCode == 200) {
          if (
            this.localStorageService.getUserActionData().actionName ==
            AppConstants.editAction
          ) {
            // Login Workflow
            this.localStorageService.setActionMessage(AppConstants.editEvent)
            this.router.navigateByUrl("/teams/teamschedule");
            return;
          }
          // Signup Workflow
          this.router.navigateByUrl("/teams/teamdashboard");
        }
      });
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.eventModel.eventLocation = result.name + "," + result.formatted_address;
  }

  onLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.eventModel.eventLatitude = this.latitude.toString()
    this.eventModel.eventLongitude = this.longitude.toString()

  }

  openAssignmentDialog(): void {
    const assignmentDialog = this.matdialog.open(EventassignmentsComponent, {
      disableClose: true,
      width: "100vw",
    
      data: {
        userSelectedAssignments: this.defaultData,
        customAssignemnts: this.customData,
      },
    });

    assignmentDialog.afterClosed().subscribe((result) => {
      if(result != undefined){
        this.defaultData = result.defaultAssignments;
        this.eventAssignmentLength = result.defaultAssignments.length;
        this.customData = [];
        if (result.customAssignmentsArray) {
          result.customAssignmentsArray.forEach(
            (customAssignment: { selected: boolean; check: any }) => {
              if (customAssignment.selected == true) {
                this.customData.push(customAssignment);
              }
            }
          );
        }
        this.totalLength =
          result.defaultAssignments.length + this.customData.length;
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


  add() {
    this.isHidden = !this.isHidden;
    this.addEventForm.value.eventTime = "";
  }
}
