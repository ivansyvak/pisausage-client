import { UserState } from './user-state';
import { PhrasesState } from './phrases-state';


export interface AppState {
  user: UserState;
  phrases: PhrasesState;
}
