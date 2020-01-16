import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app-state';
import { UserState, UserAction } from './store/user-state';
import { UserService } from './services/user.service';
import { PhrasesService } from './services/phrases.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pisausage';
  showContent = false;
  showLogin = false;

  constructor(private store: Store<AppState>, private userService: UserService, private phrasesService: PhrasesService) {}

  ngOnInit() {
    this.store.select('user').subscribe(state => {
      this.showContent = state.authorized;
      if (this.showContent) {
        this.showLogin = false;
      }
    });

    let tmpKey = localStorage.getItem('tmpKey');
    if (tmpKey) {
      this.userService.login(tmpKey)
        .then(this.onUserLogin.bind(this))
        .catch(() => {this.showContent = false; this.showLogin = true});
    } else {
      this.showLogin = true;
    }
  }

  onUserLogin() {
    this.showLogin = false; 
    this.showContent = true;
  }
}
