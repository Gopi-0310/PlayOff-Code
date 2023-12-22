import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', loadChildren: () => import('./secured-login/secured-login.module').then(m => m.SecuredLoginModule) },
                        { path: 'map-view-component', loadChildren: () => import('./map-view-component/map-view-component.module').then(m => m.MapViewComponentModule) },
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
