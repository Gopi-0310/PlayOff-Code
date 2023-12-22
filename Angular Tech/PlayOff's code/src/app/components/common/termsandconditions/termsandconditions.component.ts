import { Component, OnInit } from '@angular/core';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppConstants } from 'src/environments/AppConstants';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css']
})
export class TermsandconditionsComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();

  constructor(public localStorageService: LocalStorageService) { 
    this.navigationModel.heading = 'Terms & Conditions';
    if(this.localStorageService.getUserActionData().actionName ==
      AppConstants.signupNavigation ){
        this.navigationModel.closeURL = '/createaccount';
    }
    else{
      this.navigationModel.closeURL = '/join-team';
    }
  }

  ngOnInit(): void {
  }

}
