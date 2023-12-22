import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamComponent } from './components/create-team/create-team.component';
// import { HomeComponent } from './components/home/home.component';
import { JoinTeamComponent } from './components/join-team/join-team.component';
import { LoginOtpVerificationComponent } from './components/login-otp-verification/login-otp-verification.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PhoneVerifiedComponent } from './components/phone-verified/phone-verified.component';
import { CreateAccountComponent } from './components/signup/create-account/create-account.component';
import { OtpVerificationComponent } from './components/signup/otp-verification/otp-verification.component';
import { RegisterComponent } from './components/signup/register/register.component';
import { RoleComponent } from './components/signup/role/role.component';
import { SignupComponent } from './components/signup/signup.component';
import { TeamInvitationComponent } from './components/team-invitation/team-invitation.component';
import { TeamlistComponent } from './components/teamlist/teamlist.component';
// import { TeamDashboardComponent } from './components/teams/team-dashboard/team-dashboard.component';
import { AddeventComponent } from './components/teamsetup/addevent/addevent.component';
import { AddgamesComponent } from './components/teamsetup/addgames/addgames.component';
import { AddmemberManuallyComponent } from './components/teamsetup/addmember-manually/addmember-manually.component';
import { AddmembersComponent } from './components/teamsetup/addmembers/addmembers.component';
import { AddscheduleComponent } from './components/teamsetup/addschedule/addschedule.component';
import { TeamsetupComponent } from './components/teamsetup/teamsetup.component'; 


import { TeamsComponent } from './teams/teams.component';
import { MyteamsComponent } from './teams/components/myteams/myteams.component';
import { TeamDashboardComponent } from './teams/components/team-dashboard/team-dashboard.component';
import { TeamsMemberComponent } from './teams/components/teams-member/teams-member.component';
import { TeamsSettingsComponent } from './teams/components/teams-settings/teams-settings.component';
import { TeamsScheduleComponent } from './teams/components/teams-schedule/teams-schedule.component';
import { SelectPlayerComponent } from './components/teamsetup/select-player/select-player.component';
import { PhonecontactPermissionComponent } from './components/teamsetup/phonecontact-permission/phonecontact-permission.component';
import { TermsandconditionsComponent } from './components/common/termsandconditions/termsandconditions.component';
import { PrivacyPolicyComponent } from './components/common/privacy-policy/privacy-policy.component';
import { HelpandsupportComponent } from './components/common/helpandsupport/helpandsupport.component';
import { AboutusComponent } from './components/common/aboutus/aboutus.component';
import { TeamsEventDetailsComponent } from './teams/components/teams-event-details/teams-event-details.component';
import { TeamsEventAvailabilityComponent } from './teams/components/teams-event-availability/teams-event-availability.component';
import { TeamsEventAssignmentsComponent } from './teams/components/teams-event-assignments/teams-event-assignments.component';
import { AdComponent } from './components/ad-component/ad.component';
import { TeamsAddnewComponent } from './teams/components/teams-addnew/teams-addnew.component';
import { AddmemberComponent } from './components/teamsetup/addmember/addmember.component';
import { TeamsMemberdetailsComponent } from './teams/components/teams-memberdetails/teams-memberdetails.component';
import { TeamsTeamdetailsComponent } from './teams/components/teams-teamdetails/teams-teamdetails.component';
import { MyprofileComponent } from './components/common/myprofile/myprofile.component';



const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent}, 
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'otpVerification', component: OtpVerificationComponent  },
  { path: 'loginotpVerification', component: LoginOtpVerificationComponent },
  { path: 'phoneverification', component:  PhoneVerifiedComponent },
  { path: 'role', component:  RoleComponent },
  { path: 'createaccount', component:  CreateAccountComponent },
  { path: 'createteam', component:  CreateTeamComponent },
  { path: 'teamsetup', component: TeamsetupComponent },
  { path: 'teamsetup/addmembers', component: AddmembersComponent },
  { path: 'teamsetup/addmember', component: AddmemberComponent },
  { path: 'teamsetup/addschedule', component: AddscheduleComponent },
  { path: 'teamsetup/addmember-manually', component:  AddmemberManuallyComponent },
  { path: 'teamlist', component:  TeamlistComponent },
  { path: 'team-invitation', component:  TeamInvitationComponent },
  { path: 'join-team', component:  JoinTeamComponent },  
  { path: 'teamsetup', component: TeamsetupComponent },
  { path: 'teamsetup/addmembers', component: AddmembersComponent },
  { path: 'teamsetup/addschedule', component: AddscheduleComponent },
  { path: 'teamsetup/addmember-manually', component:  AddmemberManuallyComponent },
  { path: 'teamsetup/addgames', component: AddgamesComponent },
  { path: 'teamsetup/addevent', component: AddeventComponent },
  { path: 'teamsetup/selectplayer', component: SelectPlayerComponent },
  { path: 'teamsetup/phonecontact-permission', component: PhonecontactPermissionComponent },
  { path: 'termsandconditions', component: TermsandconditionsComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  { path: 'helpandsupport', component: HelpandsupportComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'teamsetup/select-player', component: SelectPlayerComponent},
  { path: 'ad', component: AdComponent},
  { path: 'myprofile', component: MyprofileComponent },

  { 
    path: 'teams', loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule) 
  },

  {
    path: 'teams',
    component: TeamsComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'teamdashboard', component: TeamDashboardComponent},
      { path: 'myteams', component: MyteamsComponent },
      { path: 'teamschedule', component: TeamsScheduleComponent},
      { path: 'teammembers', component: TeamsMemberComponent},
      { path: 'teammsettings', component: TeamsSettingsComponent}, 
      { path: 'eventdetails', component: TeamsEventDetailsComponent},
      { path: 'eventavailability', component: TeamsEventAvailabilityComponent},
      { path: 'eventassignments', component: TeamsEventAssignmentsComponent},
      { path: 'teamsaddnew', component: TeamsAddnewComponent},
      { path: 'memberdetails', component: TeamsMemberdetailsComponent },
      { path: 'teamdetails', component: TeamsTeamdetailsComponent }
    ]
  },
  
  
 
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
