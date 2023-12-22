import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';

@Component({
  selector: 'app-eventassignments',
  templateUrl: './eventassignments.component.html',
  styleUrls: ['./eventassignments.component.css']
})
export class EventassignmentsComponent implements OnInit{
  eventList: any
  userSelectedAssignments: any;
  customAssignments: { check: String, selected: boolean }[] = [];
  eventAssignmentsForm: FormGroup

  isManager: boolean = false;

  constructor(private shared: Shared, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EventassignmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    localStorageService: LocalStorageService) {
    this.eventAssignmentsForm = this.formBuilder.group({
      defaultAssignments: this.formBuilder.array([]),
      customAssignmentsArray: this.formBuilder.array([])
    });
    this.isManager = localStorageService.getIsManager();
  }
  ngOnInit(): void {
    const website: FormArray = this.eventAssignmentsForm.get('defaultAssignments') as FormArray;
    this.shared.eventAssignments.subscribe(res => {
      res.forEach((assignment: { eventAssignmentId: any; checked: string; }) => {
        if (this.data.userSelectedAssignments && this.data.userSelectedAssignments.indexOf(assignment.eventAssignmentId) != -1) {
          assignment.checked = "true"
          website.push(new FormControl(assignment.eventAssignmentId));
        } else {
          assignment.checked = "";
        }
      });
      this.eventList = res
    });
    this.customAssignments = this.data.customAssignemnts;
  }
  onCheckboxChange(e: any) {
    const website: FormArray = this.eventAssignmentsForm.get('defaultAssignments') as FormArray;
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
      // this.customAssignments.push(element);
    } else {
      const index = this.customAssignments.findIndex(x => x.check === e.target.value);
      if (index > -1) {
        this.customAssignments[index].selected = false;
      }
    }
  }
  customCheckbox(): FormArray {
    return this.eventAssignmentsForm.get("customAssignmentsArray") as FormArray

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

    if (this.eventAssignmentsForm && this.eventAssignmentsForm.value) {
      for(let i =0; i<this.eventAssignmentsForm.value.customAssignmentsArray.length;i++){
        if(this.eventAssignmentsForm.value.customAssignmentsArray[i].check == ''){
          this.eventAssignmentsForm.value.customAssignmentsArray.splice(i)
        }
      }
      this.data = this.eventAssignmentsForm.value;
      if (this.customAssignments && this.customAssignments.length > 0) {
        this.data.customAssignmentsArray.push(...this.customAssignments);
      }
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close(null);
    }
  }
}












