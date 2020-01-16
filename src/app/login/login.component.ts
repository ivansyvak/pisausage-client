import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app-state';
import { UserService } from '../services/user.service';
import { MatStepper } from '@angular/material';
import { UserAction, UserState } from '../store/user-state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  step = 0;
  tmpKey: string = '';
  loading: boolean = false;
  userState: UserState;

  @ViewChild('stepper', {read: MatStepper, static: true}) stepper;

  constructor(private store: Store<AppState>, private userService: UserService) { }

  ngOnInit() {
    this.store.select('user').subscribe(state => this.userState = state);
  }

  login() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.userService.login(this.tmpKey, true)
      .then(() => {
        this.step++;
        (this.stepper as MatStepper).next();
        this.loading = false;
      })
      .catch(e => (this.loading = false));
  }

  onProfileSave() {
    this.step++;
    (this.stepper as MatStepper).next();
  }

  authorize() {
      let action: UserAction = {
        type: 'set-user',
        payload: {...this.userState, ...{authorized: true}}
      }

      this.store.dispatch(action);
  }
}
