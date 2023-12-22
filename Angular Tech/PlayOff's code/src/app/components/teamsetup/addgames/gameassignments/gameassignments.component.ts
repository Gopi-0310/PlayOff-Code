import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shared } from 'src/app/shared/shared';

@Component({
  selector: 'app-gameassignments',
  templateUrl: './gameassignments.component.html',
  styleUrls: ['./gameassignments.component.css']
})
export class GameassignmentsComponent implements OnInit {
  defaultAssignments: string[] = []
  userSelectedAssignments: any;
  customAssignemnts: { check: String, selected: boolean }[] = [];
  assignments: any
  gameAssignmentsForm: FormGroup

  constructor(private shared: Shared, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<GameassignmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.gameAssignmentsForm = this.formBuilder.group({
      gameAssignments: this.formBuilder.array([]),
      checkbox: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    const website: FormArray = this.gameAssignmentsForm.get('gameAssignments') as FormArray;
    this.shared.gameAssignments.subscribe(res => {
      res.forEach((assignment: { gameAssignmentId: any; checked: string; }) => {
        if (this.data.userSelectedAssignments && this.data.userSelectedAssignments.indexOf(assignment.gameAssignmentId) != -1) {
          assignment.checked = "true"
          website.push(new FormControl(assignment.gameAssignmentId));
        } else {
          assignment.checked = "";
        }
      });
      this.assignments = res;
    });
    this.customAssignemnts = this.data.customAssignemnts;

  }
  onCheckboxChange(e: any) {
    const website: FormArray = this.gameAssignmentsForm.get('gameAssignments') as FormArray;
    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
      const index = website.controls.findIndex(x => x.value === e.target.value);
      website.removeAt(index);
    }
  }

  getCustomElement() {
    let element: { check: String, selected: boolean } = {
      check: undefined,
      selected: false
    };
    return element;
  }
  onCustomCheckboxChange(e: any) {
    if (e.target.checked) {
      let element = this.getCustomElement();
      element.check = e.target.value;
      element.selected = true;
      // this.customAssignemnts.push(element);
    } else {
      const index = this.customAssignemnts.findIndex(x => x.check === e.target.value);
      if (index > -1) {
        this.customAssignemnts[index].selected = false;
      }

    }
  }
  customCheckbox(): FormArray {
    return this.gameAssignmentsForm.get("checkbox") as FormArray
  }
  customField(): FormGroup {
    return this.formBuilder.group({
      check: [''],
      selected: ['']
    })
  }
  addField() {
    this.customCheckbox().push(this.customField());
    try{
      setTimeout(() => {
        let input = document.querySelectorAll('.customAssignments-inputField')[this.customCheckbox().length - 1] as HTMLElement;
        if (input != null) {
          input.focus();
        }
      }, 400);
      
    }catch(e){}

  }
  onSubmit() {
    if (this.gameAssignmentsForm && this.gameAssignmentsForm.value) {
      for(let i =0; i<this.gameAssignmentsForm.value.checkbox.length;i++){
        if(this.gameAssignmentsForm.value.checkbox[i].check == ''){
          this.gameAssignmentsForm.value.checkbox.splice(i)
        }
      }
      this.data = this.gameAssignmentsForm.value;
      if (this.customAssignemnts && this.customAssignemnts.length > 0) {
        this.data.checkbox.push(...this.customAssignemnts);
      }
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close(null);
    }
  }

}
