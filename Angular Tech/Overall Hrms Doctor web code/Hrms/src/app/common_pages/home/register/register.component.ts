import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/serviceCall/service.service';
import { environment } from 'src/environments/environment';
import { shared } from '../../shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(
    private router: Router,
    private service: ServiceService,
    private formbuild: FormBuilder,
    private toast: ToastrService,
    private common:shared,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formbuild.group({
      name: [''],
      mobileNumber: [''],
      email: [''],
      appoinmentTime: [''],
      appoinmentDate: [''],
      passWord: ['']
    })

  }
  register() {
    this.service.display_get_method(
      environment.clientSide.apiEndPoints).subscribe(
        (res: any) => {
          const register_user = res.find((a: any) => {
            return a.mobileNumber === this.signUpForm.value.mobileNumber,
                   a.email === this.signUpForm.value.email

          })
          if (!register_user) {
            this.service.display_post_method(
              environment.clientSide.apiEndPoints,
              this.signUpForm.value).subscribe(userResponse => {
                var emai = userResponse.email;
                localStorage.setItem("accessKey",emai);
                this.toast.info("success","registration process complete");
                this.service.isLogged=true;
                this.router.navigateByUrl('/home');
              })
          }
          else {

             this.toast.info("warning"," exit");
          }
        })
  }

  login() {
    console.log("reg-login")
    this.Click_event_child.emit('login');
  }
  @Output()
  Click_event_child: EventEmitter<any> = new EventEmitter();
}
