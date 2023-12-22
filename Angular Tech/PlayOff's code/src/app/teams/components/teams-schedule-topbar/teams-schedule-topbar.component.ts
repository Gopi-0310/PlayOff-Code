import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-teams-schedule-topbar',
  templateUrl: './teams-schedule-topbar.component.html',
  styleUrls: ['./teams-schedule-topbar.component.css']
})
export class TeamsScheduleTopbarComponent implements OnInit {

  constructor(public localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

}
