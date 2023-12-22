import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'path',component: Component,canActivateChild: [AuthGuard] },
  // { path: 'path',component: component,canActivate: [AuthGuard] },
  // { path: 'path',component: component,canDeactivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
