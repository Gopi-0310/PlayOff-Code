import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { MyteamsComponent } from './components/myteams/myteams.component';
import { TeamsMemberComponent } from './components/teams-member/teams-member.component';
import { TeamsSettingsComponent } from './components/teams-settings/teams-settings.component';
import { TeamsComponent } from './teams.component';
 

// const routes: Routes = [
//   { path: 'teams', component: TeamsComponent},
//   { path: 'teams/teamdashboard', component: TeamDashboardComponent},
//   { path: 'teams/myteams', component: MyteamsComponent },
//   { path: 'teams/teammembers', component: TeamsMemberComponent},
//   { path: 'teams/teammsettings', component: TeamsSettingsComponent}, 
// ]

const routes: Routes = [
  {
    path: 'teams',
    component: TeamsComponent,
    children: [
      { path: 'teams/teamdashboard', component: TeamDashboardComponent},
      { path: 'teams/myteams', component: MyteamsComponent },
      { path: 'teams/teammembers', component: TeamsMemberComponent},
      { path: 'teams/teammsettings', component: TeamsSettingsComponent},
     
    ]
  }
];

// RouterModule.forChild([
//   {
//       path: 'teams', component: TeamsComponent, children: [
//         { path: 'teams/teamdashboard', component: TeamDashboardComponent},
//         { path: 'teams/myteams', component: MyteamsComponent },
//         { path: 'teams/teammembers', component: TeamsMemberComponent},
//         { path: 'teams/teammsettings', component: TeamsSettingsComponent}, 
//       ]
//     },
//   ])

@NgModule({
  declarations: [],   

  imports: [MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
