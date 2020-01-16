import { Action } from '@ngrx/store';

export interface Phrase {
  key: string;
  id: string | number;
  author: string;
  content: string;
}

export interface PhrasesState {
  phrases: Phrase[];
}

export interface PhrasesAction extends Action {
  payload: any;
}

let defaultPhrasesState: PhrasesState = {
  phrases: []
};

export function phrasesReducer(state: PhrasesState = defaultPhrasesState, action: PhrasesAction) {
  let newState = {...state};

  switch (action.type) {
    case 'set-phrases': {
      newState.phrases = action.payload;
    }
  }

  return newState;
}
