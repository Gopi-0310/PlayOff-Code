import { Component, TemplateRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppConstants } from 'src/environments/AppConstants';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-teams-member',
  templateUrl: './teams-member.component.html',
  styleUrls: ['./teams-member.component.css']
})
export class TeamsMemberComponent implements OnInit {
  tabName = 'team_members'
  teamMemberData: any;
  TeamMember: any;
  teamMember: { teamId: string; memberId: string; userName:string };
  teamId: any;
  memberId: any;
  data:any;
  popupMemberId: string
  popupTeamId: string
  message: string = '';
  isManager: boolean = false;
  constructor(
    private toastr:ToastrService,
    private router: Router, 
    public auth: AuthService, 
    private matdialog: MatDialog, 
    public localStorageService: LocalStorageService) { 
    this.isManager = localStorageService.getIsManager();
    if(localStorageService.getActionMessage()== AppConstants.messageTeamMember){
      this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
      localStorageService.setActionMessage("");
    }else if(localStorageService.getActionMessage()== AppConstants.messageEditTeamMember){
      this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
      localStorageService.setActionMessage("");
    }
    else{
      localStorageService.getActionMessage();
    }
  }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>, memberId: string, teamId: string) {
    this.matdialog.open(templateRef,
      {
        disableClose: true,
      }
      );
    this.popupMemberId = memberId;
    this.popupTeamId = teamId;
  }

  ngOnInit(): void {
    this.initTeamMembers();
  }


  /**
  **** view player list ****
  * @param apiEndpointRequst = environment.apiListMember
  * @param header = auth tocken
  * @param queryparams = TeamMemberApiQueryParams
  * @param apicall = getListOfData() 
  In initTeamMembers() method is used for getting  the player list  and make a getListOfData() with the help of auth token service call
  */
  initTeamMembers() {
    let TeamMemberApiQueryParams = `?userName=${this.localStorageService.getUserName()}&teamId=${this.localStorageService.getUserTeamID()}`
    this.auth.showSpinner();
    this.auth.getListOfData(environment.apiListMember + TeamMemberApiQueryParams, Headers).subscribe(responce => {
      this.auth.hideSpinner();
      this.teamMemberData = responce.responseData.membersList;
    });
  }

  getTeamByTd(teamId: any, memberId: any) {
    this.teamId = teamId
    this.memberId = memberId
    var playerId = memberId
    this.localStorageService.setUserActionData({
      actionName:AppConstants.detailsAction,
      data:{
        'playerId': playerId
      }
    })
    this.router.navigateByUrl('/teams/memberdetails')
  }


  /**
  **** Delete Player ****
  * @param apiEndpointRequst = environment.apiDeleteMember
  * @param header = auth tocken
  * @param model = teamMember
  * @param apicall = postDataToServiceWithToken() 
  In deleteMember(firstName:string) method is used for deleting the player and make a postDataToServiceWithToken() with the help of auth token service call
  */
  deleteMember(firstName:string) {
    this.auth.showSpinner();
    this.teamMember = {
      teamId: this.popupTeamId, memberId: this.popupMemberId ,userName:this.localStorageService.getUserName()
    }
    this.auth.postDataToServiceWithToken(environment.apiDeleteMember, this.teamMember, Headers).subscribe(deleteResponse => {
      this.auth.hideSpinner();
      if (deleteResponse.apiStatus.statusCode == 200) {
        // TODO update the data wihout making API call again 
        this.toastr.success(deleteResponse.apiStatus.message,firstName,AppConstants.toastMessage)
        this.initTeamMembers();
      }
    })
  }

 
    
 

  teamSetup() {
     var teamId = this.teamId;
     this.localStorageService.setUserActionData({
      actionName: AppConstants.addAction,
      data: {
        'userTeamId' :teamId
      }
    })
    this.router.navigateByUrl("teamsetup/addmember")
  }
  editTeamMemberById(memberid:any,memberRole:string){
    this.localStorageService.setUserActionData({
      actionName: AppConstants.editAction,
      data: {
        'memberid' :memberid,
        'memberRole':memberRole,
  
      }
    })
    this.router.navigateByUrl("teamsetup/addmember")
  }
}
