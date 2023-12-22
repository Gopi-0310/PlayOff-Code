import { Component, TemplateRef, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';

import { Router } from "@angular/router";
import { ActionTypes } from "src/app/model/ActionTypes";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Shared } from "src/app/shared/shared";
import { AppConstants } from "src/environments/AppConstants";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-myteams",
  templateUrl: "./myteams.component.html",
  styleUrls: ["./myteams.component.css"],
})
export class MyteamsComponent implements OnInit {
  tabName = "teams";
  dashboardData: any = 0;
  message: string = '';
  constructor(
    private router: Router,
    public auth: AuthService,
    public shared: Shared,
    private matdialog: MatDialog,
    public localStorageService: LocalStorageService,
    public actionTypes: ActionTypes,
    private toastr:ToastrService
  ) {
    if(localStorageService.getActionMessage() == AppConstants.messageMyTeam){
      this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
      localStorageService.setActionMessage("");
    }else if(localStorageService.getActionMessage() == AppConstants.messageEditMyTeam){
      this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
      localStorageService.setActionMessage("");
    }
     else{
      localStorageService.getActionMessage();
    }
  }
  ngOnInit(): void {
    this.getTeamsList();  
  }

  /**
  **** view Teams ****
  * @param apiEndpointRequst = environment.apiTeamList
  * @param header = auth tocken
  * @param queryparams = myTeamListApiQueryParams
  * @param apicall = getListOfData() 
  In getTeamsList() method is used for getting  the team list  and make a getListOfData() with the help of auth token service call
  */
  getTeamsList() {
    let myTeamListApiQueryParams =
      "?userName=" + this.localStorageService.getUserName();
      this.auth.showSpinner();
    this.auth
      .getListOfData(
        environment.apiTeamList + myTeamListApiQueryParams,
        Headers
      )
      .subscribe((responce) => {
        this.auth.hideSpinner();
        this.dashboardData = responce.responseData.teamList;
      });
  }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.matdialog.open(templateRef,
      {
        disableClose: true,
      }
      );
  }
  openDialogTemplateRef(templateRef: TemplateRef<any>){
    this.matdialog.open(templateRef);
  }

  createTeam() {
    this.localStorageService.setUserActionData({
      actionName: AppConstants.createAnotherAction,
      data: {},
    });   
    this.router.navigateByUrl("/createteam");
  }

  getTeamById(teamId: any) {
    this.localStorageService.setUserActionData({
      actionName: this.actionTypes.teamDetails,
      data: { teamId },
    });
    this.router.navigateByUrl("/teams/teamdetails");
  }

  changeTeamById(teamID: any, teamName: any, role: boolean) {
    this.localStorageService.setUserTeam({ teamID, teamName });
    this.localStorageService.setIsManager(role);
    this.getTeamsList();
    this.router.navigateByUrl("/teams/teamdashboard");
  }


  /**
  **** Delete Teams ****
  * @param apiEndpointRequst = environment.apiDeleteTeam
  * @param header = auth tocken
  * @param queryparams = TeamLandingApiQueryParams
  * @param apicall = postDataToServiceWithToken() 
  In deleteTeamById() method is used for deleting the team and make a postDataToServiceWithToken() with the help of auth token service call
  */
  deleteTeamById(teamId: any,teamName: any) {
    let TeamLandingApiQueryParams = `?teamId=${teamId}&userName=${this.localStorageService.getUserName()}`;
    this.auth.showSpinner();
    this.auth
      .postDataToServiceWithToken(
        environment.apiDeleteTeam + TeamLandingApiQueryParams,
        Headers
      )
      .subscribe((deleteResponse) => {
        this.auth.hideSpinner();
        if (deleteResponse.apiStatus.statusCode == 200) {
          this.toastr.success(deleteResponse.apiStatus.message,teamName,AppConstants.toastMessage)
          this.getTeamsList();
        }
      });
  }

  editTeamById(teamID: any) {
    this.localStorageService.setUserActionData({
      actionName: AppConstants.editAction,
      data: { teamID },
    });
    this.router.navigateByUrl("/createteam");
  }
}
