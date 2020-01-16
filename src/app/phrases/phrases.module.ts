import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhrasesRoutingModule } from './phrases-routing.module';
import { PhrasesComponent } from './phrases.component';
import { MatTableModule, MatButtonModule, MatDialogModule, MatFormField, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { PhraseComponent } from './phrase/phrase.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PhrasesComponent, PhraseComponent],
  imports: [
    CommonModule,
    PhrasesRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule
  ],
  exports: [PhrasesComponent, PhraseComponent],
  entryComponents: [PhraseComponent, PhrasesComponent]
})
export class PhrasesModule { }
