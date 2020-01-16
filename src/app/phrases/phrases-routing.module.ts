import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhrasesComponent } from './phrases.component';

const routes: Routes = [{ path: '', component: PhrasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhrasesRoutingModule { }
