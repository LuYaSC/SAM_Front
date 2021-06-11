// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


// Theme Routing
import { ControlGiftComponent } from './control-gift.component';
import { CelebrationsRoutingModule } from './celebrations-routing.module';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DirectivesModule } from '../../Directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    CelebrationsRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    DirectivesModule
  ],
  declarations: [
    ControlGiftComponent,
  ]
})
export class CelebrationsModule { }
