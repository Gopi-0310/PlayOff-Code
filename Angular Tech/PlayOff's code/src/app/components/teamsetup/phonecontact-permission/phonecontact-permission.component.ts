import { Component, Inject } from '@angular/core';
 
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-phonecontact-permission',
  templateUrl: './phonecontact-permission.component.html',
  styleUrls: ['./phonecontact-permission.component.css']
})
export class PhonecontactPermissionComponent {

  constructor(
    public dialogRef: MatDialogRef<PhonecontactPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}