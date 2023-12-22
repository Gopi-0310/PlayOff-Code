import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';
import { AppConstants } from 'src/environments/AppConstants';

@Component({
  selector: 'app-teams-addnew',
  templateUrl: './teams-addnew.component.html',
  styleUrls: ['./teams-addnew.component.css']
})
export class TeamsAddnewComponent implements OnInit {
  tabName = '';
  actionData="";
 
  constructor(public localStorageService:LocalStorageService, private router:Router, private shared:Shared) { }

  ngOnInit(): void {
    this.shared.navigateUrl = this.router.url
  }
createTeam(){
  this.localStorageService.setUserActionData({
    actionName: AppConstants.createAnotherActionFromTopAdd,
    data: {},
  });   
  this.router.navigateByUrl("/createteam");
}
addSchedule(){
  this.localStorageService.setUserActionData({
    actionName: AppConstants.createAnotherActionFromTopAdd,
    data: {}, 
  });
  this.router.navigateByUrl('/teamsetup/addschedule')
}
addMember(){
  this.localStorageService.setUserActionData({
    actionName: AppConstants.createAnotherActionFromTopAdd,
    data: {}, 
  });
  this.router.navigateByUrl('/teamsetup/addmember')
}
}
