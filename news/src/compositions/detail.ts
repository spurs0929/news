import { IGlobalState } from "@/store";
import { SET_CURRENT_NEWS } from "@/store/detail/actionTypes";
import { INewsInfo } from "@/typings";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { Store } from "vuex";

// 獲取目前新聞訊息
function useDetailInfo(store: Store<IGlobalState>, route: RouteLocationNormalizedLoaded): INewsInfo | undefined {
  // 新聞的唯一key
  const uniquekey: string = route.params.uniquekey as string;
  // 跳轉到詳情頁的頁面來源
  const pageFrom: string = route.params.from as string;

  /**
   * 如果pageFrom來源是收藏頁 
   *   從localStorage裡取
   * 不是收藏頁
   *   從store裡取 
   */ 
  const newsData: INewsInfo[] = pageFrom === 'MyNews'
        ? JSON.parse(localStorage.getItem('newsList') || '[]')
        : store.state.home.newsList.news;
     
  const newsInfo: INewsInfo | undefined = newsData.find((item: INewsInfo) => item.uniqueKey === uniquekey);
  // 設置目前新聞
  store.dispatch(`detail/${SET_CURRENT_NEWS}`, newsInfo);
  
  return newsInfo;
}

export {
  useDetailInfo
}