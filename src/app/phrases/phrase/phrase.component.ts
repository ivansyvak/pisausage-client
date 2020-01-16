import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Phrase } from 'src/app/store/phrases-state';
import { PhrasesService } from 'src/app/services/phrases.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.css']
})
export class PhraseComponent implements OnInit {
  key: string = '';
  content: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public dialogRef: MatDialogRef<PhraseComponent>,
    private phrasesService: PhrasesService,
    private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: Phrase,
  ) { }

  ngOnInit() {
    this.key = this.data.key;
    this.content = this.data.content;
  }

  close() {
    this.dialogRef.close();
  }

  postPhrase() {
    let data: Phrase = {
      key: this.key,
      content: this.content,
      author: this.data.author,
      id: this.data.id
    }

    this.phrasesService.postPhrase(data)
      .then(() => {
        this.phrasesService.getPhrases()
          .then(() => {
            this.close();
          });
      })
      // .then(this.phrasesService.getPhrases)
      // .then(this.dialogRef.close);
  }
}
