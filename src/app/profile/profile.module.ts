import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { PhrasesModule } from '../phrases/phrases.module';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    MatButtonModule,
    PhrasesModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
