import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module'

import { MyteamsComponent } from './components/myteams/myteams.component';
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { TopMenuBarComponent } from './components/top-menu-bar/top-menu-bar.component';
import { TeamsComponent } from './teams.component';
import { SideBarManuComponent } from './components/sidebar_menu/sidebar_menu.component'; 
import { MaterialModule } from '../material/material.module';
import { TeamsLandingComponent } from './components/teams-landing/teams-landing.component';
import { TeamsSettingsComponent } from './components/teams-settings/teams-settings.component';
import { TeamsMemberComponent } from './components/teams-member/teams-member.component';
import { TeamsScheduleComponent } from './components/teams-schedule/teams-schedule.component';
import { RouterModule } from '@angular/router';
import { TeamsEventDetailsComponent } from './components/teams-event-details/teams-event-details.component';
import { TeamsScheduleTopbarComponent } from './components/teams-schedule-topbar/teams-schedule-topbar.component';
import { TeamsEventAvailabilityComponent } from './components/teams-event-availability/teams-event-availability.component';
import { TeamsEventAssignmentsComponent } from './components/teams-event-assignments/teams-event-assignments.component';
import { TeamsHeaderComponent } from './components/teams-header/teams-header.component';
import { TeamsEventBannerComponent } from './components/teams-event-banner/teams-event-banner.component';
import { TeamsAddnewComponent } from './components/teams-addnew/teams-addnew.component';
import { TeamsMemberdetailsComponent } from './components/teams-memberdetails/teams-memberdetails.component';
import { TeamsMemberbannerComponent } from './components/teams-memberbanner/teams-memberbanner.component';
import { TeamsDetailtopComponent } from './components/teams-detailtop/teams-detailtop.component';
import { TeamsTeamdetailsComponent } from './components/teams-teamdetails/teams-teamdetails.component';
import { TeamsTeambannerComponent } from './components/teams-teambanner/teams-teambanner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { AdComponent } from '../components/ad-component/ad.component';

@NgModule({
  declarations: [
    MyteamsComponent,
    TeamDashboardComponent,
    TopMenuBarComponent,
    TeamsComponent,
    SideBarManuComponent,
    TeamsLandingComponent,
    TeamsSettingsComponent,
    TeamsMemberComponent,
    TeamsScheduleComponent,
    TeamsEventDetailsComponent,
    TeamsScheduleTopbarComponent,
    TeamsEventAvailabilityComponent,
    TeamsEventAssignmentsComponent,
    TeamsHeaderComponent,
    TeamsEventBannerComponent,
    TeamsAddnewComponent,
    TeamsMemberdetailsComponent,
    TeamsMemberbannerComponent,
    TeamsDetailtopComponent,
    TeamsTeamdetailsComponent,
    TeamsTeambannerComponent,
    AdComponent
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TeamsRoutingModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatGoogleMapsAutocompleteModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmO7djCKCzJ2Oi6VvJw31MtFw-aqUptvY',
      libraries: ['places']
    }),
    
  ]
})
export class TeamsModule { }
