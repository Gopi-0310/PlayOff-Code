import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationModel } from 'src/app/model/NavigationModel';

@Component({
  selector: 'app-helpandsupport',
  templateUrl: './helpandsupport.component.html',
  styleUrls: ['./helpandsupport.component.css']
})
export class HelpandsupportComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();
  step = 0;

  data = [
    { id: 1, title: 'Expanable 1' },
    { id: 2, title: 'Expanable 2' },
    { id: 3, title: 'Expanable 3' },
    { id: 4, title: 'Expanable 4' },
    { id: 5, title: 'Expanable 5' }
  ];
  form = this.fb.group({
    selected: [null]
  });

  constructor(private fb: FormBuilder) {
    this.navigationModel.closeURL = '/teams/teamdashboard';
    this.navigationModel.heading = 'Help & Support';
  }

  ngOnInit(): void {
  }

  setStep(selected: any) {
    this.form.patchValue({ selected });
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  noop(event: MouseEvent) {
    console.log('noop', event);
    event.preventDefault();
    event.stopPropagation();
  }

}
