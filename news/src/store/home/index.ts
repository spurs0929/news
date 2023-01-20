import { IHomeState } from "@/typings";
import { Module } from "vuex";
import { IGlobalState } from "..";

import state from './state';
import actions from "./actions";
import mutations from "./mutations";

const homeModule: Module<IHomeState, IGlobalState> = {
  namespaced: true, // 開啟namespaced
  state,
  actions,
  mutations
}

export default homeModule;