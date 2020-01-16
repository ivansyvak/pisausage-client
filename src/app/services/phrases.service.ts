import { Injectable } from "@angular/core";
import { UserState } from '../store/user-state';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app-state';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { PhrasesAction, Phrase } from '../store/phrases-state';

@Injectable({providedIn: 'root'})
export class PhrasesService {
  userState: UserState;

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {
    this.store.select('user').subscribe(state => this.userState = state);
  }

  async getPhrases() {
    if (!this.userState.tmpKey) {
      return;
    }

    let requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tmpKey: this.userState.tmpKey})
    }

    return new Promise((resolve, reject) => {
      fetch(`${environment.apiURL}/phrases/list`, requestParams)
        .then(res => res.json())
        .then(this.checkStatus.bind(this))
        .then(this.onPhrasesLoaded.bind(this))
        .then(resolve)
        .catch(e => this.onError(e, reject));
    });
  }

  async postPhrase(data: Phrase) {
    let url = '';
    
    if (data.id == '') {
      url = `${environment.apiURL}/phrases/create`;
    } else {
      url = `${environment.apiURL}/phrases/update`;
    }

    let requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tmpKey: this.userState.tmpKey,
        ...data
      })
    }

    return new Promise((resolve, reject) => {
      fetch(url, requestParams)
        .then(res => res.json())
        .then(this.checkStatus.bind(this))
        .then(resolve)
        .catch(e => this.onError(e, reject));
    });
  }

  async deletePhrase(data: Phrase) {
    let requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tmpKey: this.userState.tmpKey,
        ...data
      })
    }

    return new Promise((resolve, reject) => {
      fetch(`${environment.apiURL}/phrases/delete`, requestParams)
        .then(res => res.json())
        .then(this.checkStatus.bind(this))
        .then(resolve)
        .catch(e => this.onError(e, reject));
    });

  }

  private onPhrasesLoaded(data) {
    let action: PhrasesAction = {
      type: 'set-phrases',
      payload: data
    }

    this.store.dispatch(action);
  }

  private async checkStatus(res) {
    if (res.error) {
      throw new Error(res.message);
    }

    return res;
  }

  private onError(e, reject) {
    this.snackBar.open(e.message, 'Close', {duration: 2000});
  }
}