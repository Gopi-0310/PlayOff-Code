import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CryptographyService } from '../../services/cryptography.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SocialLoginService } from '../../services/social-login.service';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { ApiInteractionsService } from '../../services/api-interactions.service';
import {Location} from "@angular-material-extensions/google-maps-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm_type        : any = 0;
  role                  : string = "Basic";
  identifier_Type       : any;
  hide                  = true;
  selectedOption        : any = '0';
  GoogleLoginProvider   = GoogleLoginProvider;
  userLocation          :string ="";

  constructor (
    protected crypto : CryptographyService,
    private   api    : ApiInteractionsService,
    private   toastr : ToastrService,
    protected social : SocialLoginService,
    private   cdr    : ChangeDetectorRef,
    ) {}

  ngOnInit(): void {
    this.social.GoogleAuthCheck_OnInit();   //To check whether the user can able to sign in or not.
    this.changeLoginType(0);                //initialize with Username
    this.cdr.detectChanges();
  }
  
  login_inputArray = [
    {value: '0', viewValue: 'Username'                        , placeholder : 'Ex. John Doe'          , error_msg : 'Please enter valid Username'},
    {value: '1', viewValue: 'Email'                           , placeholder : 'Ex. johndoe@domain.com', error_msg : 'Please enter valid E-mail'},
    {value: '2', viewValue: 'Phone number'                    , placeholder : 'Ex. 9854674512'        , error_msg : 'Please enter valid Phone number'},
    {value: '3', viewValue: 'Username / E-mail'               , placeholder : 'Ex. johndoe@domain.com', error_msg : 'Please enter valid Username / E-mail'},
    {value: '4', viewValue: 'Username / Phone number'         , placeholder : 'Ex. 9854674512'        , error_msg : 'Please enter valid Username / Phone number'},
    {value: '5', viewValue: 'Email / Phone number'            , placeholder : 'Ex. johndoe@domain.com', error_msg : 'Please enter valid E-mail  / Phone number'},
    {value: '6', viewValue: 'Username / Phone number / E-mail', placeholder : 'Ex. johndoe@domain.com', error_msg : 'Please enter valid Username / E-mail / Phone number'}
  ];

  @ViewChild('reg')   reg!    : MatButtonToggle;
  @ViewChild('login') login!  : MatButtonToggle;

  LoginForm = new FormGroup({
    identifier:new FormControl('',[
      Validators.required,
      this.customValidation(),
    ]),
    password : new FormControl('',[
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).*$'),
      Validators.minLength(8),
      Validators.maxLength(20)
    ]),
    role : new FormControl(this.role,[]),
    location           : new FormControl('',[]),
    locationLatitude   : new FormControl(),
    locationLongitude  : new FormControl(),
    state              : new FormControl(),
    city               : new FormControl(),
    country            : new FormControl(),    
  })

  get identifier()  { return this.LoginForm.get('identifier')}
  get password()    { return this.LoginForm.get('password')}

  changeLoginType(data:any)
  {
    const filteredValue     = this.login_inputArray.find(x=>x.value == data.toString())
    this.identifier_Type    = filteredValue;
    this.loginForm_type     = filteredValue?.value;
    this.clearForm();
  }
  customValidation() : ValidatorFn 
  {
    return (control: AbstractControl): { [key: string]: any } | null => {
      var regex;
      var length
      switch(Number(this.loginForm_type))
      {
        case 0: //Username only with whitespaces
          regex = environment.regex_username , length = environment.length_username;
        break;
        case 1: //Email only
          regex = environment.regex_email , length = environment.length_email;
        break;
        case 2: //Phone number only ranges from 6 to 15
          regex = environment.regex_phonenumber , length = environment.length_phonenumber;
        break;
        case 3: //Username or email
          if(control.value!=null && control.value.indexOf('@') !== -1) //E-mail has @ symbol
            regex = environment.regex_email , length = environment.length_email;
          else regex = environment.regex_username , length = environment.length_username;
        break;
        case 4: //Username or Phone number
          if (/\D/.test(control.value)) // \D is a metacharacter that matches non-numerical digits
            regex = environment.regex_username , length = environment.length_username; //if non-numeric username
          else regex = environment.regex_phonenumber , length = environment.length_phonenumber; //only number = phonenumbers
        break;
        case 5: //email or phone number
        if(control.value!=null && control.value.indexOf('@') !== -1) //E-mail has @ symbol
          regex = environment.regex_email , length = environment.length_email;
        else regex = environment.regex_phonenumber , length = environment.length_phonenumber;
        break;
        case 6: //username or email or phone number
        if(control.value!=null && control.value.indexOf('@') !== -1) //E-mail has @ symbol
          regex = environment.regex_email , length = environment.length_email;
        else if (/\D/.test(control.value))
          regex = environment.regex_username , length = environment.length_username;
        else regex = environment.regex_phonenumber , length = environment.length_phonenumber;
        break;
      }
      const isValid = regex?.test(control.value) && length?.test(control.value);
      return isValid ? null : { customValidation: true };
    };
  }

  Login()
  {
    this.crypto.Authorized_User = this.LoginForm.value;
    this.crypto.Authorize_Pass();
  }
  Register()
  { 

    this.api.getLoginInfo().subscribe((res=> //Username exists check
      {
        var response = Object.values(res);
        //E-mail exist check without case sensitive
        if(this.LoginForm.value.identifier?.indexOf('@') !== -1) //is E-mail check
        {
          if(response.find(x=>
           x.identifier && x.identifier.toLowerCase() === this.LoginForm.value.identifier?.toLowerCase() ||
           x.additionalFactor && x.additionalFactor.toLowerCase() === this.LoginForm.value.identifier?.toLowerCase()
          ))
          {
            this.toastr.error(environment.alreadyExists)
            return
          }
        }
        else  //Username or Phone number check with case sensitive
        {
          if(response.find(x=>
            x.identifier === this.LoginForm.value.identifier))
            {
              this.toastr.error(environment.alreadyExists)
              return
            }
        }
        //assign registered data
        this.crypto.Authorized_User = this.LoginForm.value; 
        //Hashing
        this.crypto.hashPassword().subscribe((res)=>{
          //if we directly assign the LoginForm.value to other variable, changing variable data also affects the LoginForm.value
          //so here we are using Object assign
          var formData = Object.assign({}, this.LoginForm.value); 
          formData.password = res;
          this.api.postData = formData; //replacing hash value with original pass
          console.log(this.api.postData)
          this.api.postRegInfo().subscribe(res=>{
            console.log(res)
            this.toastr.success(environment.registered);
            //To switch to login if succesfully registered
            this.clearForm();
            this.login.checked = true;
          })
      })
    }))
  }
  clearForm()
  {
    this.LoginForm.reset();
    this.LoginForm.get('role')?.setValue(this.role) //To assign the role value manually
  }

  //map
  onAutocompleteSelected(result: PlaceResult) {
    this.LoginForm.value.location = result.name + "," + result.formatted_address
    }

  onLocationSelected(location: Location) {
    this.LoginForm.value.locationLatitude   =  location.latitude;
    this.LoginForm.value.locationLongitude  =  location.longitude;
    console.log(this.LoginForm.value.locationLatitude);
    console.log(this.LoginForm.value.locationLongitude);
   }
}