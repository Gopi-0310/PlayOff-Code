import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/serviceCall/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(
              private router:Router,
              private service :ServiceService,
              private formbuild :FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formbuild.group({
      email:[''],
      mobileNumber:[''],
      passWord:['']
    })
  }
 
  login(){
     this.service.display_get_method(environment.clientSide.apiEndPoints).subscribe((res:any)=>{
      console.log("resbackent",res);
         const login_user = res.find((a:any)=>{
          return a.email === this.loginForm.value.email,
                 a.mobileNumber === this.loginForm.value.mobileNumber 
                 
         })
         if(login_user){
          console.log("resbackent-login_user",login_user);
          // this.service.display_post_method(environment.apiEndPoints,this.loginForm.value).subscribe(responce=>{
            localStorage.setItem("accessKey",login_user.email); 
             this.service.login_data =  login_user;
             this.service.isLogged=true; 
            this.router.navigateByUrl('/home')
           
           
          // })
         }
         else{
          alert("user exists")
         }
     })
    
  }
  signUp(){
   console.log("log-reg")
   this.Click_event_child.emit('signup');
  }
  @Output()
  Click_event_child : EventEmitter<any> = new EventEmitter();
}
