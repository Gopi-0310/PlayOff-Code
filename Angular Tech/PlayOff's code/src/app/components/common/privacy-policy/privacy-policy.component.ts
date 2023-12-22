import { Component, OnInit } from '@angular/core';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppConstants } from 'src/environments/AppConstants';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();

  constructor(public localStorageService: LocalStorageService) {
    this.navigationModel.heading = 'Privacy & Policy';

    if(this.localStorageService.getUserActionData().actionName ==
    AppConstants.signupInviteNavigation ){
      this.navigationModel.closeURL = '/join-team';
  }
  else{
    this.navigationModel.closeURL = '/createaccount';
    
  }

   }

  ngOnInit(): void {
  }

}
