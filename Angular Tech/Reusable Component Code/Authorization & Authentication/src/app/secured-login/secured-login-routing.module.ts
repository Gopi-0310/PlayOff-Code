import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';


const routes: Routes = [
  { path: '',           component : LoginComponent                                         },
  { path: 'top',        component : TopNavComponent                                        },
  { path: 'Admin' ,     component : AdminComponent      ,  canActivate : [AdminGuard]      }, 
  { path: 'superAdmin', component : SuperAdminComponent ,  canActivate : [SuperAdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuredLoginRoutingModule { }
