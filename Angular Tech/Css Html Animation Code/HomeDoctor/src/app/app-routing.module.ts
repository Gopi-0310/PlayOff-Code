import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { PationDetailsComponent } from './informations/pation-details/pation-details.component';
import { RegisterComponent } from './common/register/register.component';
import { PageNotFoundComponent } from './informations/page-not-found/page-not-found.component';
import { SecureGuardsGuard } from './secure-guards.guard';

const routes: Routes = [
  {path:'',component:LoginComponent,pathMatch:'full'},
  {path:'patient',component:PationDetailsComponent, canActivate:[SecureGuardsGuard]},
  {path:'login',component:RegisterComponent},
  //this i gave if user give unvanted data in request that time this component
 
 // this will give lazy loading when we need to access the component that time below the componeds are downloaded
  {
   path:'information',loadChildren: ()=> import('./informations/informations.module').then(m=> m.InformationsModule),
   canActivate:[SecureGuardsGuard]
  },
  { path: 'relive', loadChildren: () => import('./relive/relive.module').then(m => m.ReliveModule),
  canActivate:[SecureGuardsGuard] },
  
  {path:'**',component:PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
