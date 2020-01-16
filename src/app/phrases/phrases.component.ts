import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { PhrasesService } from '../services/phrases.service';
import { AppState } from '../store/app-state';
import { Phrase, PhrasesState } from '../store/phrases-state';
import { UserState } from '../store/user-state';
import { MatDialog } from '@angular/material';
import { PhraseComponent } from './phrase/phrase.component';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.css']
})
export class PhrasesComponent implements OnInit {
  userState: UserState;
  displayedColumns: string[] = ['key', 'content', 'actions'];
  dataSource: Phrase[] = [];

  constructor(
    private phrasesService: PhrasesService, 
    private store: Store<AppState>, 
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.select('user').subscribe(state => this.userState = state);
    this.store.select('phrases').subscribe(this.setPhrasesByUser.bind(this));

    this.phrasesService.getPhrases();
  }

  setPhrasesByUser(phrasesState: PhrasesState) {
    if (!this.userState || !this.userState.tmpKey) {
      return;
    }

    this.dataSource = Object.values(phrasesState.phrases)
      .filter(phrase => phrase.author == this.userState.id);
  }

  createPhrase() {
    let newPhrase: Phrase = {
      author: this.userState.id,
      key: '',
      content: '',
      id: ''
    }
    const dialogRef = this.dialog.open(PhraseComponent, {
      data: newPhrase
    });
  }

  editPhrase(data: Phrase) {
    const dialogRef = this.dialog.open(PhraseComponent, {data});
  }

  deletePhrase(event: Event, data: Phrase) {
    event.cancelBubble = true;
    this.phrasesService.deletePhrase(data)
      .then(() => this.phrasesService.getPhrases());

  }
}
