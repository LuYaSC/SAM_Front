import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlGiftComponent } from './control-gift.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Celebraciones'
    },
    children: [
      {
        path: '',
        redirectTo: 'control-gift'
      },
      {
        path: 'control-gift',
        component: ControlGiftComponent,
        data: {
          title: 'Control de Obsequios'
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CelebrationsRoutingModule { }
