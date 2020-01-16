import { Action } from '@ngrx/store';

export interface UserAction extends Action {
  payload: any;
}

export interface UserState {
  authorized: boolean;
  tmpKey: string;
  id: string;
  username: string;
  tag: string;
  avatarURL: string;
  displayAvatarURL: string;
}

const defaultUserState: UserState = {
  authorized: false,
  tmpKey: '',
  id: '',
  username: 'Unknown user',
  tag: '',
  avatarURL: '',
  displayAvatarURL: ''
}

export function userReducer(state: UserState = defaultUserState, action: UserAction) {
  let newState = {...state};

  switch (action.type) {
    case 'set-user':
      newState = action.payload;
  }

  return newState;
}
