import { Component, OnInit } from '@angular/core';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { Shared } from 'src/app/shared/shared';

@Component({
  selector: 'app-teamsetup',
  templateUrl: './teamsetup.component.html',
  styleUrls: ['./teamsetup.component.css']
})
export class TeamsetupComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();

  constructor(private shared:Shared) {
   }

  ngOnInit(): void {
    this.shared.setTitle('Team Setup')
    localStorage.setItem("localValue","teamSetup")
  }

}
