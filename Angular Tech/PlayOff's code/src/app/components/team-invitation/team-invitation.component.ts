import { Component, OnInit } from '@angular/core';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-team-invitation',
  templateUrl: './team-invitation.component.html',
  styleUrls: ['./team-invitation.component.css']
})
export class TeamInvitationComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();

  constructor(public localStorageService:LocalStorageService) {
    this.navigationModel.heading = 'Team Invitation';
  }

  ngOnInit(): void {
  }

}
