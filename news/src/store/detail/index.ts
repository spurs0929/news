import state from './state';
import actions from './actions';
import mutations from './mutations';
import { IDetailState } from '@/typings';
import { Module } from 'vuex';
import { IGlobalState } from '..';

const detailModule: Module<IDetailState, IGlobalState> = {
  namespaced: true, // 開啟命名空間
  state,
  actions,
  mutations
}

export default detailModule;