import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapViewComponentRoutingModule } from './map-view-component-routing.module';
import { MapViewComponentComponent } from './map-view-component.component';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './common/navbar/navbar.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    MapViewComponentComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MapViewComponentRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatSortModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmO7djCKCzJ2Oi6VvJw31MtFw-aqUptvY',
      libraries: ['places']
    }),
    FlexLayoutModule,
    
  ]
})
export class MapViewComponentModule { }
