import { IHomeState, INewsList, IRetNewsData, NAV_TYPES } from "@/typings";
import * as actionTypes from './actionTypes';

export default {
  [actionTypes.SET_LOADING] (state: IHomeState, isLoading: boolean) {
    state.newsList.isLoading = isLoading;
  },
  [actionTypes.SET_NEWS_LIST] (state: IHomeState, payload: IRetNewsData) {
    // hasMore為true代表還有下一頁，因此需要合併state -> news
    // pageNum + 1
    if (payload.hasMore) {
      state.newsList.news = [...state.newsList.news, ...payload.data!];
      state.newsList.pageNum += 1;
    }

    // hasMore重新賦值
    state.newsList.hasMore = payload.hasMore;
    // isLoading設置為false
    state.newsList.isLoading = false;
  },
  // 修改新聞類型
  [actionTypes.SET_CURRENT_TYPE] (state: IHomeState, type: NAV_TYPES) {
    state.currentType = type;

    // newsList修改成默認值
    state.newsList = <INewsList> {
      hasMore: true,
      isLoading: false,
      pageNum: 0,
      count: 10,
      news: []
    }
  }
}