import { IHomeState, IPostData, INewsInfo, NAV_TYPES } from '@/typings';
import { Commit } from 'vuex';
import * as actionTypes from './actionTypes';
import { getNewsList } from '../../services';

export default {
  [actionTypes.SET_NEWS_LIST]({ commit, state}: { commit: Commit, state: IHomeState }, options: IPostData) {
    // 頁面加載中不請求資料
    if (state.newsList.isLoading) {
      return;
    }

    // 沒有更多資料
    if (!state.newsList.hasMore) {
      return;
    }

    /**
     * pageNum === 0 顯示skeleton
     * pageNum > 0 顯示 正在加載中
     */
    if (state.newsList.pageNum) {
      commit(actionTypes.SET_LOADING, true);
    }

    // 請求資料，返回的資料類型為 INewsInfo[]
    getNewsList<INewsInfo[]>(options).then((data) => {
      commit(actionTypes.SET_NEWS_LIST, data);
    }).catch((err: any) => {
      throw err;
    });
  }
}