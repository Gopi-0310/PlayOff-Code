import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();
  role = ''
  signUpForm!: FormGroup
  coach = "Coach";
  step2: boolean = true;
  constructor(private router: Router, private formBuilder: FormBuilder, public localStorageService: LocalStorageService) {
    this.navigationModel.backURL = '/signup';
    this.navigationModel.heading = 'Sign Up';
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      role: ['']
    })
  }
   /**
 * onSubmit() has Userdata to store the LocalStorage
  */
  onSubmit(role: any) {
    let actionData = this.localStorageService.getUserActionData();
    actionData.data.role = role;
    this.localStorageService.setUserActionData(actionData);
    this.router.navigateByUrl('/createaccount')
  }
}
