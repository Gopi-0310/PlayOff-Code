import { Component, OnInit } from '@angular/core';
import { CryptographyService } from '../../services/cryptography.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SocialLoginService } from '../../services/social-login.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor( 
    protected crypto                : CryptographyService,
    private readonly _authService   : SocialAuthService,
    protected route                 : Router,
    private loginComponent          : LoginComponent,
    private social                  : SocialLoginService,
    
    ) { }
  ngOnInit(): void {
  }

  logout()
  { 
    const provider = localStorage.getItem('provider')
    if(this.crypto.isLoggedin && provider === 'GG' || this.crypto.isLoggedin && provider === 'MM')
    {
      this.crypto.openDialog_service(provider, 'socialLogout').subscribe(res=>
      {
        console.log(res)
        switch(res)
        {
          case "loggedout":
            this.partial_logout()
          break;
          case "logoutCompletelyMM":
            this.crypto.clear_localStorage();
            window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:4200/'
              setTimeout(() => {
                this.initialization();
              },2000);
          break;
          case "logoutCompletelyGG":
            this.complete_logout();
          break;
        }
        
      });
    }
    else
    {
      this.crypto.openDialog_service(this.crypto.Logged_User, 'logout').subscribe(res=>{
        if(res === 'loggingout')
        {
          this.partial_logout();
        }
      });
    }
  }

  partial_logout()
  {
    this.crypto.clear_localStorage();
    this.initialization();
    this.route.navigate(['/']);
  }
  complete_logout()
  {
    this.crypto.clear_localStorage();
    this._authService.signOut();
    this.initialization();
    this.route.navigate(['/']);
    this.social.isGoogleSignedIn = false;
  }
  initialization()
  {
    this.crypto.isLoggedin = !this.crypto.isLoggedin;   // Disable btn
    this.crypto.Logged_User = ''; 
    this.crypto.showBtn = '';  
    this.loginComponent.clearForm();            
  }

  mapView(){
    this.route.navigate(['/map-view-component']);
  }
}
