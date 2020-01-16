import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from '../store/app-state';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { UserAction, UserState } from '../store/user-state';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userState: UserState;
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {
    this.store.select('user').subscribe(state => this.userState = state);
  }

  async login(tmpKey: string, preventAuth: boolean = false) {
    let requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tmpKey}),
    }

    return new Promise((resolve, reject) => {
      return fetch(`${environment.apiURL}/users`, requestParams)
        .then(res => res.json())
        .then(res => this.checkStatus(res, preventAuth))
        .then(resolve)
        .catch(e => {
          this.handleError(e);
          reject(e);
        })
    });
    
  }

  private async checkStatus(res, preventAuth: boolean) {
    if (res.error) {
      throw new Error(res.message);
    }

    localStorage.setItem('tmpKey', res.tmpKey);

    const aciton: UserAction = {
      type: 'set-user',
      payload: {...this.userState, ...res, ...{authorized: preventAuth? false: true}}
    }
    
    this.store.dispatch(aciton);
  }

  private handleError(e) {
    this.snackBar.open(e.message, 'Close', {duration: 2000});
  }
}