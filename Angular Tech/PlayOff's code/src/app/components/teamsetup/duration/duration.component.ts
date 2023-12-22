import { AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit,AfterContentChecked{

  durationForm: FormGroup;
  constructor(public localStorageService: LocalStorageService, public auth: AuthService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DurationData, public matDialog: MatDialog, private changeDetector: ChangeDetectorRef,) { 
    }
 
  ngOnInit(): void {
    this.durationForm = this.formBuilder.group({
      hours: ['', [Validators.required]],
      minutes: ['', [Validators.required]]
    });
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  durationSubmit() {
    if (this.data.action == "game") {
      let index = this.data.durationHoursList.findIndex(
        (x: { gameDurationId: string }) =>
          x.gameDurationId === this.data.durationHours
      );
      let durationHourVal = this.data.durationHoursList[index].gameDurationHours;
      let index2 = this.data.durationMinutesList.findIndex(
        (x: { gameDurationId: string }) =>
          x.gameDurationId === this.data.durationMinutes
      );
      let durationMinVal = this.data.durationMinutesList[index2].gameDurationMinutes;
      this.data.durationTotal =
        durationHourVal + " " + durationMinVal;
    }

    else if (this.data.action == "event") {
      let index = this.data.durationHoursList.findIndex(
        (x: { eventDurationId: string }) =>
          x.eventDurationId === this.data.durationHours
      );
      let durationHourVal = this.data.durationHoursList[index].eventDurationHours;
      let index2 = this.data.durationMinutesList.findIndex(
        (x: { eventDurationId: string }) =>
          x.eventDurationId === this.data.durationMinutes
      );
      let durationMinVal = this.data.durationMinutesList[index2].eventDurationMinutes;
      this.data.durationTotal =
        durationHourVal + " " + durationMinVal;

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DurationData {
  durationHours: string
  durationMinutes: string
  durationHoursList: any
  durationMinutesList: any
  durationTotal: any
  action: string
}