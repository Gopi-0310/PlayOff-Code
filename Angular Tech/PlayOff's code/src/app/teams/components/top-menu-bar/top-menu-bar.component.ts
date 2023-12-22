import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'top-menu-bar[currentTab]',
  templateUrl: './top-menu-bar.component.html',
  styleUrls: ['./top-menu-bar.component.css']
})
export class TopMenuBarComponent {
  @Input() currentTab = '';

  constructor(private router :Router) { }
  
  dashBoard(){
   this.router.navigateByUrl("/teams/teamdashboard");
  }

  schedule(){
    this.router.navigateByUrl("/teams/teamschedule");
  }

  teams(){
    this.router.navigateByUrl("/teams/myteams");
  }

  teammembers(){
    this.router.navigateByUrl("/teams/teammembers");
  }
  
  setting(){
    this.router.navigateByUrl("/teams/teammsettings");
  }
}
