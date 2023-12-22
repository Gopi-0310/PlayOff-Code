import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { MaterialModule } from './material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { SplashscreenComponent } from './components/splashscreen/splashscreen.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/signup/register/register.component';
import { OtpVerificationComponent } from './components/signup/otp-verification/otp-verification.component';

import { LoginOtpVerificationComponent } from './components/login-otp-verification/login-otp-verification.component';
import { PhoneVerifiedComponent } from './components/phone-verified/phone-verified.component';
import { RoleComponent } from './components/signup/role/role.component';
import { CreateAccountComponent } from './components/signup/create-account/create-account.component';
import { TeamlistComponent } from './components/teamlist/teamlist.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SelectLanguageComponent } from './components/common/select-language/select-language.component';
import { TopBarComponent } from './components/common/top-bar/top-bar.component';
import { ProgressBarComponent } from './components/common/progress-bar/progress-bar.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AddmemberManuallyComponent } from './components/teamsetup/addmember-manually/addmember-manually.component';
import { AddscheduleComponent } from './components/teamsetup/addschedule/addschedule.component';
import { TeamsetupComponent } from './components/teamsetup/teamsetup.component';
import { AddgamesComponent } from './components/teamsetup/addgames/addgames.component';
import { AddeventComponent } from './components/teamsetup/addevent/addevent.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTimepickerModule } from 'mat-timepicker';
import { TeamInvitationComponent } from './components/team-invitation/team-invitation.component';
import { JoinTeamComponent } from './components/join-team/join-team.component';

import { FormsModule} from '@angular/forms';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { GameassignmentsComponent } from './components/teamsetup/addgames/gameassignments/gameassignments.component';
import { PhonecontactPermissionComponent } from './components/teamsetup/phonecontact-permission/phonecontact-permission.component';
import { TermsandconditionsComponent } from './components/common/termsandconditions/termsandconditions.component';
import { PrivacyPolicyComponent } from './components/common/privacy-policy/privacy-policy.component';
import { HelpandsupportComponent } from './components/common/helpandsupport/helpandsupport.component';
import { AboutusComponent } from './components/common/aboutus/aboutus.component';
import { EventassignmentsComponent } from './components/teamsetup/addevent/eventassignments/eventassignments.component';
import { SelectPlayerComponent } from './components/teamsetup/select-player/select-player.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AddmemberComponent } from './components/teamsetup/addmember/addmember.component';
import { AddmembersComponent } from './components/teamsetup/addmembers/addmembers.component';
import { MyprofileComponent } from './components/common/myprofile/myprofile.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSpinnerOverlayComponent } from './mat-progress-spinner/mat-progress-spinner.component'
import { ErrorHandlerService } from './services/error-handler.service';
import { OpponentComponent } from './components/teamsetup/addgames/opponent/opponent.component';
import { DurationComponent } from './components/teamsetup/duration/duration.component';
import { ScrollingModule } from '@angular/cdk/scrolling';



// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SplashscreenComponent,
    HomeComponent,
    RegisterComponent,
    OtpVerificationComponent,
    PagenotfoundComponent,
    LoginOtpVerificationComponent,
    PhoneVerifiedComponent,
    RoleComponent,
    CreateAccountComponent,
    TeamlistComponent,
    SelectLanguageComponent,
    TopBarComponent,
    ProgressBarComponent,
    CreateTeamComponent,
    TeamsetupComponent,
    AddmemberManuallyComponent,
    AddmembersComponent,
    AddscheduleComponent,
    AddgamesComponent,
    AddeventComponent,
    TeamInvitationComponent,
    JoinTeamComponent,
    GameassignmentsComponent,
    SelectPlayerComponent,
    PhonecontactPermissionComponent,
    TermsandconditionsComponent,
    PrivacyPolicyComponent,
    HelpandsupportComponent,
    AboutusComponent,
    EventassignmentsComponent,
    SelectPlayerComponent,
    AddmemberComponent,
    MyprofileComponent,
    MatSpinnerOverlayComponent,
    OpponentComponent,
    DurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTimepickerModule, 
    NgxMaterialTimepickerModule,
    MatGoogleMapsAutocompleteModule,
    ToastrModule.forRoot({
     preventDuplicates:true
    }

    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmO7djCKCzJ2Oi6VvJw31MtFw-aqUptvY',
      libraries: ['places']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ],
  providers: [AddmemberManuallyComponent,AddgamesComponent,AddeventComponent,SelectPlayerComponent, AddmembersComponent,AddmemberComponent,CreateTeamComponent, MatSpinnerOverlayComponent,
    { provide: ErrorHandler, useClass: ErrorHandlerService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
