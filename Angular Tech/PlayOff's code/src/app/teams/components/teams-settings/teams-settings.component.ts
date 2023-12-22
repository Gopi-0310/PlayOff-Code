import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-settings',
  templateUrl: './teams-settings.component.html',
  styleUrls: ['./teams-settings.component.css']
})
export class TeamsSettingsComponent implements OnInit {
  tabName = 'settings'
  public show:boolean = false;
  public buttonName:any = 'Show';
  constructor() { }

  ngOnInit(): void {}

    clicklanguage()
    {
        this.show = !this.show;

        // CHANGE THE NAME OF THE BUTTON.
        if(this.show)  
          this.buttonName = "Hide";
        else
          this.buttonName = "Show";
      }
    }
  

 
