import { Component, TemplateRef, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Shared } from "src/app/shared/shared";
import { AppConstants } from "src/environments/AppConstants";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-teams-schedule",
  templateUrl: "./teams-schedule.component.html",
  styleUrls: ["./teams-schedule.component.css"],
})
export class TeamsScheduleComponent implements OnInit {
  tabName = "schedule";
  scheduleList: any;
  isManager: boolean = false;
  constructor(
    private matdialog: MatDialog,
    private router: Router,
    public auth: AuthService,
    public localStorageService: LocalStorageService,
    private toastr:ToastrService
  ) {
    if(localStorageService.getActionMessage() == AppConstants.createEventLogin){
      this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
      localStorageService.setActionMessage("");
      }
     else if(localStorageService.getActionMessage() == AppConstants.editEvent){
      this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
      localStorageService.setActionMessage("");
     }
     else if(localStorageService.getActionMessage() == AppConstants.createGameLogin){
      this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
      localStorageService.setActionMessage("");
     }
     else if(localStorageService.getActionMessage() == AppConstants.editGame){
      this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
      localStorageService.setActionMessage("");
     }
     else{
      localStorageService.getActionMessage();
    } 


   }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.matdialog.open(templateRef,  
      {
        disableClose: true,
      });
  }

  ngOnInit(): void {
    this.listSchedules();
  }

  /**
  **** view schedule list Event/Game ****
  * @param apiEndpointRequst = environment.apiScheduleList
  * @param header = auth tocken
  * @param queryparams = scheduleApiQueryParams
  * @param apicall = getListOfData() 
  In listSchedules()method is used for getting  the schedule(event/game) list  and make a getListOfData() with the help of auth tocken service call
  */
  listSchedules() {
    let scheduleApiQueryParams = `?userName=${this.localStorageService.getUserName()}&teamId=${this.localStorageService.getUserTeamID()}`;
    this.auth.showSpinner();
    this.auth
      .getListOfData(
        environment.apiScheduleList + scheduleApiQueryParams,
        Headers
      )
      .subscribe((response) => {
        this.auth.hideSpinner();
        this.scheduleList = response.responseData.schduleList;
        this.isManager = this.localStorageService.getIsManager();
        // if(response.responseData.schduleList && response.responseData.schduleList.length > 0 )
        // {
        //   this.localStorageService.setIsManager(response.responseData.schduleList[0].isManager);
        //   this.isManager = response.responseData.schduleList[0].isManager;
        // }
        
      });
  }

  openSchedule() {
    this.localStorageService.setUserActionData({
      actionName: AppConstants.editAction,
      data: {},
    });
    this.router.navigateByUrl("teamsetup/addschedule");
  }

  /**
  **** Delete schedule ****
  * @param apiEndpointRequst = environment.apiDeleteGame,apiDeleteEvent
  * @param header = auth tocken
  * @param queryparams = deleteGameParams,deleteEventParams
  * @param apicall = postDataToServiceWithToken() 
  In deleteScheduleById(scheduleId: any, type: any) method is used for deleting the game and event  and make a postDataToServiceWithToken() with the help of auth token service call
  */
  deleteScheduleById(scheduleId: any, type: any) {
    this.auth.showSpinner();
    var deleteEventParams = `?eventId=${scheduleId}&userName=${this.localStorageService.getUserName()}`;
    var deleteGameParams = `?gameId=${scheduleId}&userName=${this.localStorageService.getUserName()}`;
    if (type == "game") {
      this.auth
        .postDataToServiceWithToken(
          environment.apiDeleteGame + deleteGameParams,
          Headers
        )
        .subscribe((res) => {
          this.auth.hideSpinner();
          if (res.apiStatus.statusCode == 200) {
            this.toastr.success(res.apiStatus.message,"",AppConstants.toastMessage)
            this.listSchedules();
          }
        });
    } else if (type == "event") {
      this.auth
        .postDataToServiceWithToken(
          environment.apiDeleteEvent + deleteEventParams,
          Headers
        )
        .subscribe((res) => {
          this.toastr.success(res.apiStatus.message,"",AppConstants.toastMessage)
          this.auth.hideSpinner();
          if (res.apiStatus.statusCode == 200) {
            this.listSchedules();
          }
        });
    }
  }

  editScheduleById(scheduleId: any, type: any) {
    if (type == "game") {
      this.localStorageService.setUserActionData({
        actionName: AppConstants.editAction,
        data: {
          gameid: scheduleId,
        },
      });
      this.router.navigateByUrl("/teamsetup/addgames");
    } else if (type == "event") {
      this.localStorageService.setUserActionData({
        actionName: AppConstants.editAction,
        data: {
          eventid: scheduleId,
        },
      });
      this.router.navigateByUrl("/teamsetup/addevent");
    }
  }

  scheduleDetails(scheduleId: any, type: any) {
    if (type == "game") {
      this.localStorageService.setUserActionData({
        actionName: "",
        data: {
          gameid: scheduleId,
          type: type
        },
      });
      this.router.navigateByUrl("/teams/eventdetails");
    } else if (type == "event") {
      this.localStorageService.setUserActionData({
        actionName: "",
        data: {
          eventid: scheduleId,
          type: type
        },
      });
      this.router.navigateByUrl("/teams/eventdetails");
    }
  }
}
