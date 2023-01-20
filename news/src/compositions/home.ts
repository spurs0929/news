import { IGlobalState } from "@/store";
import { SET_NEWS_LIST } from "@/store/home/actionTypes";
import { NAV_TYPES, IHomeState, IPostData, INewsInfo } from "@/typings";
import { computed, ComputedRef } from "vue";
import { Store } from "vuex";

function useNewsList(store: Store<IGlobalState>): ComputedRef<INewsInfo[]>{
  const state: IHomeState = store.state.home;
  // 請求參數
  const type: NAV_TYPES = computed(() => state.currentType).value;
  const pageNum: number = computed(() => state.newsList.pageNum).value;
  const count: number = computed(() => state.newsList.count).value;
  // 請求的新聞列表
  const newsList: ComputedRef<INewsInfo[]> = computed(() => state.newsList.news);

  store.dispatch(`home/${SET_NEWS_LIST}`, <IPostData>{
    type, pageNum, count
  });

  return newsList;
}

export {
  useNewsList
}