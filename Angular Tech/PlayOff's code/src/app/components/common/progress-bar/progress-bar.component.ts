import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input() step1: boolean = false;
  @Input() step2: boolean = false;
  @Input() step3: boolean = false;
  constructor() { 

  }
}
