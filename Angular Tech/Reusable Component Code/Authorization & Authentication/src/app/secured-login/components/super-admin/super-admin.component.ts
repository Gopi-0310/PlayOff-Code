import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CryptographyService } from '../../services/cryptography.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiInteractionsService } from '../../services/api-interactions.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {

  constructor(
    protected crypto  : CryptographyService,
    private   cdr     : ChangeDetectorRef,
    private   api     : ApiInteractionsService
  ) { }

  //Common
  expand_accordion  : boolean = false;  
  users_length!     : number;
  users_data!       : MatTableDataSource<any>
  users_columns     : string[] = ['identifier','additionalFactor','role','promote','demote','delete']

  @ViewChild('usersPage') users_Paginator  !:MatPaginator
  @ViewChild('usersSort') users_Sort       !:MatSort

  ngOnInit(): void {
    this.assignTableData()
  }

  assignTableData()
  {
    this.api.getLoginInfo().subscribe(res=>
      {
        console.log(res)
        this.expand_accordion = true;
        //
        this.users_data = new MatTableDataSource(Object.values(res));
        this.users_data.paginator       = this.users_Paginator;
        this.users_data.sort            = this.users_Sort;
        this.cdr.detectChanges();
      })
  }

  users_Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users_data.filter = filterValue.trim().toLowerCase();
    if (this.users_data.paginator) 
    {
      this.users_data.paginator.firstPage();
    }
    setTimeout(() => {
      this.users_length = this.users_data.paginator?.length ?? 0;
    },1);
  }

  Delete(data:any)
  {
    this.api.deleteId=data.id;
    this.api.deleteLoginInfo().subscribe(()=>
      {
        this.assignTableData();
      });
  }
  Promote(data:any)
  {
    this.crypto.isPromoted(data);
    this.api.putLoginInfo().subscribe(()=>{
      this.assignTableData();
    });
  }
  Demote(data:any)
  {
    this.crypto.isDemoted(data);
    this.api.putLoginInfo().subscribe(()=>{
      this.assignTableData();
    });
  }
  openDialog(row : any, dialogType:string) {
    this.crypto.openDialog_service(row, dialogType).subscribe(res=>{
      switch(res)
      {
        case "deleted":
          this.Delete(row);
        break;
      }
    });
  }
}
