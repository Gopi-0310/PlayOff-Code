import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuredLoginRoutingModule } from './secured-login-routing.module';
import { SecuredLoginComponent } from './secured-login.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { ErrorHandlingService } from './services/error-handling.service';
import { AdminComponent } from './components/admin/admin.component';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { AdminGuard } from './guards/admin.guard';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { GoogleLoginProvider, MicrosoftLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { SocialLoginService } from './services/social-login.service';


//Angular Materials
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MapViewComponentModule } from '../map-view-component/map-view-component.module';
import { LocationComponent } from './components/location/location.component';

@NgModule({
  declarations: [
    SecuredLoginComponent,
    LoginComponent,
    AdminComponent,
    TopNavComponent,
    SuperAdminComponent,
    MatDialogComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    SecuredLoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    //Angular Materials
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MapViewComponentModule,
    MatGoogleMapsAutocompleteModule
  ],
  providers:[SuperAdminGuard,AdminGuard,LoginComponent,SocialLoginService,{provide:ErrorHandler, useClass:ErrorHandlingService},
            {
              provide   : 'SocialAuthServiceConfig',
              useValue  : {
              autoLogin : true,
              providers : [
           {
              id       : GoogleLoginProvider.PROVIDER_ID,
              provider : new GoogleLoginProvider(
              '565253689203-11g4ag15mnvl4mi5t1osn6ec9qv940ut.apps.googleusercontent.com',{
                oneTapEnabled: false, 
              })
           },
           {
              id       : MicrosoftLoginProvider.PROVIDER_ID,
              provider : new MicrosoftLoginProvider(
              '0611ccc3-9521-45b6-b432-039852002705'),
          },
        ],
          onError : (err:any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
})
export class SecuredLoginModule { }
