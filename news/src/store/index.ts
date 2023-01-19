import { IHomeState, IDetailState } from '@/typings';
import { createStore } from 'vuex'

import home from './home';

export interface IGlobalState {
  home: IHomeState,
  detail: IDetailState
}

export default createStore<IGlobalState>({
  modules: {
    home,
  }
});

