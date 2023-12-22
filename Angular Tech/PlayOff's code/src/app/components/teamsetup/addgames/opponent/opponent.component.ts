import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shared } from 'src/app/shared/shared';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.css']
})
export class OpponentComponent implements OnInit {
  opponentForm: FormGroup
  constructor(
    private shared: Shared,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OpponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OpponentData,
  ) { }

  ngOnInit(): void {
    this.opponentForm = this.formBuilder.group({
      teamName: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      emailAddress: ['']
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  key(event: any) {
    this.shared.keyPress(event);
  }
}
export interface OpponentData {
  teamName: string;
  contactPersonName: string;
  countryCode: string;
  mobileNo: string;
  emailAddress: string;
}