import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app-state';
import { UserState } from '../store/user-state';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userState: UserState;
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @Input() editMode: boolean = false;

  constructor(private store: Store<AppState>, private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.store.select('user').subscribe(state => this.userState = state);    
  }

  getTrustedImage(userState) {
    return this.sanitization.bypassSecurityTrustStyle(`url(${userState.avatarURL})`);
  }

  triggerOnSave() {
    this.onSave.emit();
  }

}
