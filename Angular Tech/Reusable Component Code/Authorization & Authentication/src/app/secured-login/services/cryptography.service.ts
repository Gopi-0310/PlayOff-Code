import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../components/mat-dialog/mat-dialog.component';
import { ApiInteractionsService } from './api-interactions.service';
import { SpinnerService } from './spinner.service';
@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  //Common
  Authorized_User   : any;
  Logged_UserData   : any;
  Logged_User       : any;
  password          : any;
  stored_data       : any;
  showBtn           : string = '';
  enableContent     : boolean = false;
  isLoggedin        : any = undefined;

  constructor(
    private toastr  : ToastrService,
    public  dialog  : MatDialog,
    private api     : ApiInteractionsService,
    private spinner : SpinnerService

    ) { }
  
  hashPassword(): Observable<any> { //takes this.password and emits hash
    const salt = bcrypt.genSaltSync(9); //512 iterations (2 to the power of 9)
    return new Observable((observer : any) => {
      //password input from Register()
      bcrypt.hash(this.Authorized_User.password + environment.pepper, salt, (err, hash) => {
        if (err) observer.error(err);
        else observer.next(hash) && observer.complete();
      });
    });
  }

  validate_Hash(type: number): Observable<any> {
    return new Observable((observer: Observer<boolean>) => {
      let found = false;
      if (type == 0) // validate pass
      {
          bcrypt.compare(this.Authorized_User.password + environment.pepper, this.stored_data.password, (err, result) => {
            if (result) {
              observer.next(this.stored_data);
              observer.complete();
            }
            else {
              // call observer.next() even if result is false and this is the last item in the array
              observer.next(false);
              observer.complete();
            }
          });
      }
      else if (type == 1) // validate data
      {
        for (let data of this.Authorized_User.password) {
          bcrypt.compare(JSON.stringify(data) + environment.pepper, this.stored_data, (err, result) => {
            if (result) {
              found = true;
              observer.next(data);
              observer.complete();
            }
            else if (!found && data === this.Authorized_User.password[this.Authorized_User.password.length - 1]) {
              // call observer.next() even if result is false and this is the last item in the array
              observer.next(false);
              observer.complete();
            }
          });
        }
      }
    });
  }

  Authorize_Pass()
  {
    this.api.getLoginInfo().subscribe((res)=>
    {
    this.spinner.isSpinner = true;
      var response = Object.values(res);
      if(this.Authorized_User.identifier?.indexOf('@') !== -1) //is E-mail check
      {
        this.stored_data = response.find(x=>x.identifier.toLowerCase()==this.Authorized_User.identifier.toLowerCase())
        console.log(this.stored_data)
      }
      else  //Username or Phone number check with case sensitive
      {
        this.stored_data = response.find(x=>x.identifier == this.Authorized_User.identifier);
      }
      if(this.stored_data) //data assigned from login component
      {
        this.validate_Hash(0).subscribe((res)=> 
        //validates password //either returns data if true //or returns false
        {
          if(res && res!=false)
          {
            //If Authentication done, Hash the entire data
            this.Authorized_User.password = JSON.stringify(res); //assign entire data
            this.hashPassword().subscribe((res)=> //Hash entire data
            {
              localStorage.setItem('data',res) //Entire hashed data
              //set time
              const currentTime = new Date().getTime();
              localStorage.setItem('sessionTime', currentTime.toString());
              this.toastr.success(environment.loggedIn)
              //Authorize
              this.Authorize_Data().subscribe();
            })
          }
          else this.toastr.error(environment.invalidCredentials)
          this.spinner.isSpinner= false;
        })
      }
      else this.toastr.error(environment.invalidCredentials)
      this.spinner.isSpinner = false;
    })
  }

  Authorize_Data()
  {
    return new Observable((observer : Observer<any>)=>
    {
      const sessionTime = parseInt(localStorage.getItem('sessionTime') ?? '0', 10) //get stored time
      const currentTime = new Date().getTime(); //get current time 
      const elapsedTime = (currentTime - sessionTime) / (1000 * 60 * 60) //stored time - current time
      if(elapsedTime < 12) //if less than 12 hours 
      {
        this.Authorized_User={};
        this.api.getLoginInfo().subscribe((res)=>
        {
          this.Authorized_User.password = res //list of complete data;
          this.stored_data = localStorage.getItem('data')
          this.validate_Hash(1).subscribe((res=>
            {
              if(this.Authorized_User.password.find((x: { identifier: any; })=>x.identifier == res.identifier))
              {
                  this.Logged_User= res.identifier; //Identify Authorized User by passing Entire data
                  this.Logged_UserData = res;       //To display Authorized User Name without errors
                  this.isLoggedin = true;
                if(res.role === environment.SuperAdmin || res.role === environment.Admin)
                {
                  if(res.role === environment.SuperAdmin)
                  this.showBtn = "Pro";
                  else if (res.role === environment.Admin)
                  this.showBtn = 'Advance';
                }
                if(res.role === environment.User) //If Login in as Basic user, the Buttons will hide
                {
                  this.showBtn = "";
                }
                observer.next(true);
                observer.complete();
                return
              }
              if(res == false)
              {
                observer.next(false);
                observer.complete();
                return
              }
              observer.next(false);
              observer.complete();
            }))
        })
        this.spinner.isSpinner = false;
      }
      else //if not less than 12 hours
      {
        observer.next(false);
        observer.complete();
        this.clear_localStorage();
        this.spinner.isSpinner = false;
      }
    })
  }
  clear_localStorage()
  {
    //don't use clear() method, as it may affects the entire localStorage and affects other applications
    localStorage.removeItem('data');
    localStorage.removeItem('sessionTime');
    localStorage.removeItem('provider');
  }
  isDenied(data : any)
  {
    this.api.putId = data.id;
    data.role = environment.User;
    this.api.putData = data;
  }
  isPromoted(data : any)
  {
    this.api.putId = data.id;
    if(data.role == environment.User)
    {  data.role = environment.Admin; }
    else if(data.role == environment.Admin)
    {  data.role = environment.SuperAdmin;}
    this.api.putData = data;
    
  }
  isDemoted(data : any)
  {
    this.api.putId = data.id;
    if(data.role == environment.SuperAdmin)
    {  data.role = environment.Admin; }
    else if(data.role == environment.Admin)
    {  data.role = environment.User;}
    this.api.putData = data;
  }
  openDialog_service(row : any, dialogType:string) : Observable<string> 
  {
    const enterAnimationDuration = '300ms';
    const exitAnimationDuration  = '300ms'
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '78vmin',height: '23vmin', enterAnimationDuration, exitAnimationDuration, data: { dialogType: dialogType , row : row },
    });
    return dialogRef.afterClosed();
  }
}
