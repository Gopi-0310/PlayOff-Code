import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { CallByFunctions } from 'src/app/model/call-by-functions';
import { Register } from 'src/app/model/register';
import { ServiceService } from 'src/app/serviceCall/service.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  card1: boolean = false;
  card2: boolean = false;
  stream!: MediaStream;
  registerModel!: Register;
  registerForm!: FormGroup;
  loginUserResponse: any;
  condition: string = "check_In";
  storage_system: boolean = true;
  public triggerObservable: Subject<void> = new Subject<void>();
  public webcamImage!: WebcamImage;
  capturedImage: any;
  constructor(
    public service: ServiceService,
    public formbuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService


  ) {

  }

  ngOnInit() {

    this.registerForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      sex: ['', [Validators.required]],
      age: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      disease: ['', [Validators.required]],
      time: ['', [Validators.required]]
    })
    this.userDetailsMethod();


  }
  public triggerSnapshot(): void {
    this.triggerObservable.next();
  }
  public handleImage(webcamImage: WebcamImage): void {
    // Do something with the captured image, for example:
    this.capturedImage = webcamImage.imageAsDataUrl;
  }

  
  userDetailsMethod() {
    this.service.serviceGetMethod(environment.apiUrlSignup).subscribe(userResponse => {
      this.loginUserResponse = userResponse
      console.log("response", this.loginUserResponse)
    })
  }

  

  register() {
    this.card1 = true;
    this.card2 = false;
    this.condition = "check_Out";
    localStorage.setItem('accessBoolean_check_Out', this.condition)
    this.storage_system = this.service.auth_storage;
    console.log(this.storage_system);
  }

  signup() {
    this.service.serviceGetMethod(environment.apiUrlSignup).subscribe((res: any) => {
      const user = res.find((a: any) => {
        return a.mobileNumber === this.registerForm.value.mobileNumber

      })
      if (!user) {
        this.service.servicePostMethod(environment.apiUrlSignup, this.registerForm.value)
          .subscribe(response => {

            this.service.isLogged = true;
            let web = "user"
            let name = response.username;
            let sex = response.sex;
            let age = response.age;
            let mobileNumber = response.mobileNumber;
            let disease = response.disease;
            let time = response.time;

            let objToSend: NavigationExtras = {};
            objToSend.state = {
              web,
              name,
              sex,
              age,
              mobileNumber,
              disease,
              time
            };

            this.router.navigateByUrl('/patient', objToSend);
          })
      }
      else {
        alert("user Exists")
      }
    })
    // // const signUp = this.loginUserResponse.includes((user:any)=>user.mobileNumber != this.registerForm.value.mobileNumber);
    //   if(this.loginUserResponse.includes(!this.registerForm.value.mobileNumber)){
    //      this.service.servicePostMethod(environment.apiUrlSignup, this.registerForm.value)
    //     .subscribe(response => {

    //     this.service.isLogged=true;
    //     let web = "user"
    //     let name = response.username;
    //     let sex = response.sex;
    //     let age=response.age;
    //     let mobileNumber= response.mobileNumber;
    //     let disease = response.disease;
    //     let time = response.time;

    //     let objToSend: NavigationExtras = {};
    //      objToSend.state = { 
    //       web,
    //       name,
    //       sex,
    //       age,
    //       mobileNumber,
    //       disease,
    //       time
    //      };

    //     this.router.navigateByUrl('/patient',objToSend);
    //   })
    //   // this.toastr.success('Registartion', 'Success!');
    // }

    //   else{
    //     //  alert("user  exit") 
    //     // this.toastr.info('Registartion', 'Success!');
    //      this.router.navigateByUrl('');
    //   }


  }

  login() {
    this.card1 = false;
    this.card2 = true;
  }
  loginUser() {
    const user = this.loginUserResponse.find((a: any) => {
      if (a.mobileNumber == this.registerForm.value.mobileNumber) {
        this.service.isLogged = true;
        let web = "user"
        let name = a.username;
        let sex = a.sex;
        let age = a.age;
        let mobileNumber = a.mobileNumber;
        let disease = a.disease;
        let time = a.time;
        let objToSend: NavigationExtras = {};
        objToSend.state = {
          web,
          name,
          sex,
          age,
          mobileNumber,
          disease,
          time
        };

        this.router.navigateByUrl('/patient', objToSend);
      }
      else if (this.registerForm.value.username == "admin" && this.registerForm.value.mobileNumber == "1111111111") {
        this.service.isLogged = true;
        let admin = "admin";
        let objToSend: NavigationExtras = {};
        objToSend.state = {
          admin
        };
        this.router.navigateByUrl('/patient', objToSend);
      }
      else {
        this.toastr.success("User Doesn't Exists")
      }
    })

  }
}
