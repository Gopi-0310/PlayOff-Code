import { Component, OnInit } from '@angular/core';
import { NavigationModel } from 'src/app/model/NavigationModel';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();

  constructor() {
    this.navigationModel.closeURL = '/teams/teamdashboard';
    this.navigationModel.heading = 'About Us';
   }

  ngOnInit(): void {
  }

}
