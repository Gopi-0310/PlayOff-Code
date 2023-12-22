import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebCameAccessComponent } from './web-came-access.component';
import { CommonComponent } from './common/common.component';

const routes: Routes = [{ path: '', component: WebCameAccessComponent },
                        { path: 'common',component: CommonComponent} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebCameAccessRoutingModule { }
