import { Component, TemplateRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';
import { NavigationModel } from 'src/app/model/NavigationModel';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.css']
})
export class TeamlistComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();
  message: string = "";
  listTeam:any;
 
  constructor(private router: Router,private auth:AuthService,private shared:Shared, private matdialog: MatDialog, public localStorageService: LocalStorageService ) {
    this.navigationModel.poppupcloseURL = 'popPupCloseUrl';
    this.navigationModel.heading = 'Team List';
   }
   
  ngOnInit(): void {
    if(this.localStorageService.getUserTeamID() != ''){
      this.router.navigateByUrl('/teams/teamdashboard');
      return;
    }
  /**
  **** Team List ****
  * @param apiEndpointRequst = environment.apiTeamList
  * @param queryparams = TeamListApiQueryParams
  * @param apicall = getListOfData() 
  * In  TeamListApiQueryParams  is used for getting team list and make a getListOfData() with the help of auth token service call
  */
    let TeamListApiQueryParams = "?userName=" + this.localStorageService.getUserName();
    this.auth.showSpinner();
    this.auth.getListOfData(environment.apiTeamList + TeamListApiQueryParams, Headers).subscribe(response => {
      this.auth.hideSpinner();
      this.listTeam = response.responseData.teamList;
    });   
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.matdialog.open(templateRef,
      {
        disableClose: true,
      }
      );
  }
 /**
  ****Select The Team details ****
  In selectTeam(memberRole:string,teamID:any, teamName: any, role: boolean) method  is used for getting team data's and set the all team data to the local storage
  */
  selectTeam(memberRole:string,teamID:any, teamName: any, role: boolean){
    this.localStorageService.setUserTeam({teamID, teamName});
    this.localStorageService.setUserRole(memberRole);
    this.localStorageService.setIsManager(role);
    this.router.navigateByUrl('/teams/teamdashboard');
  }
  
}
