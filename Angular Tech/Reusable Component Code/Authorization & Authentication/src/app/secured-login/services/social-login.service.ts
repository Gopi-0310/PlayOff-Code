import { Injectable } from '@angular/core';
import { LoginForm } from '../modals/login-form.modal';
import { CryptographyService } from './cryptography.service';
import { environment } from 'src/environments/environment';
import { ApiInteractionsService } from './api-interactions.service';
import { MicrosoftLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  constructor(
    private crypto                : CryptographyService,
    private api                   : ApiInteractionsService,
    private readonly _authService : SocialAuthService,
    private toastr                : ToastrService,
    private spinner               : SpinnerService
  ) { }

  user!             : SocialUser;
  isGoogleSignedIn  : boolean = false;

  GoogleAuthCheck_OnInit()
  {
    this._authService.authState.subscribe((user) => {
      this.user = user;
      if(user && user.provider === 'GOOGLE' &&!this.crypto.isLoggedin && !this.isGoogleSignedIn) //crypto.logout_Btn indicates custom Login
      {
        this.isGoogleSignedIn = true; // prevents multiple occurances
        this.signInWithGoogle();      //no click event for Google btn
      }
    }); 
  }
  signInWithMicrosoft(): void 
  {
    this.spinner.isSpinner = true;
    this._authService.signIn(MicrosoftLoginProvider.PROVIDER_ID)
    .then(data => {
        this.socialLogin(data);
      })
      .catch(error => {
        console.log(error)
        this.toastr.error(environment.errorHappened + ', ' + environment.tryAgain)
        this.spinner.isSpinner = false;
      });
  }
  signInWithGoogle(): void {
    this.spinner.isSpinner = true;
    this.socialLogin(this.user) 
  }
  socialLogin(user : any) 
  {
    var pass : any;
    if(user.provider === 'MICROSOFT') pass = user.response.uniqueId , localStorage.setItem('provider','MM');
    if(user.provider === 'GOOGLE') pass = user.id , localStorage.setItem('provider','GG');;
    this.api.getLoginInfo().subscribe((res)=>
    {
      //get single data
      const exisiting_User = Object.values(res).find(x=>x.additionalFactor == user.email)
      //assign as per the modal
      if(!exisiting_User)  //Register new user
      {
        const regdata : LoginForm = 
        {
          identifier        : user.name,
          password          : pass,
          role              : 'Basic' ,
          additionalFactor  : user.email
        }
        //assign
        this.crypto.Authorized_User = regdata;
        //Hash
        this.crypto.hashPassword().subscribe((res)=>
        {
          // data.password = res; //change password to hashed password
          var formData = Object.assign({}, regdata);
          formData.password = res;
          //Register
          this.api.postData = formData;
          this.api.postRegInfo().subscribe(()=>
          {
            //Login only after registration
            this.crypto.Authorized_User = regdata;
            this.crypto.Authorize_Pass();
            // localStorage.setItem('crossCheck',environment.customString) //To identify Authorized using Social sign in
          })
        })
      }
      else
      {
        const logindata : LoginForm = 
        {
          identifier        : user.name,
          password          : pass,
          role              : exisiting_User.role ,
          additionalFactor  : user.email
        }
        //assign and authorize (Login)
        this.crypto.Authorized_User = logindata;
        this.crypto.Authorize_Pass();
        // localStorage.setItem('crossCheck',environment.customString) //To identify Authorized using Social sign in
      }
    })
  }
}
