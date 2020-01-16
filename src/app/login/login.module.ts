import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatStepperModule, MatButtonModule, MatInputModule, MatCardModule
} from '@angular/material';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { ProfileModule } from '../profile/profile.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ProfileModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
