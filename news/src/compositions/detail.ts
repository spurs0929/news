import { IGlobalState } from "@/store";
import { SET_CURRENT_NEWS } from "@/store/detail/actionTypes";
import { INewsInfo } from "@/typings";
import { computed } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { Store } from "vuex";

// 收藏新聞
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
  const newsInfo: INewsInfo | undefined = newsData.find((item: INewsInfo) => item.uniquekey === uniquekey);
  // 設置目前新聞
  store.dispatch(`detail/${SET_CURRENT_NEWS}`, newsInfo);
  
  return newsInfo;
}

function useNewsFollow(store: Store<IGlobalState>, callback: (status: boolean) => void): void {
  console.log(store);
  const currentNews: INewsInfo = computed(() => store.state.detail.currentNews).value;

  let newsList: INewsInfo[] = JSON.parse(localStorage.getItem('newsList') || '[]');
  let followStatus: boolean = false;

  // 有收藏的新聞列表
  if(newsList.length) {
    // 收藏的新聞是否跟目前想收藏的新聞相同
    const isExist: INewsInfo | undefined = newsList.find((item: INewsInfo) => item.uniquekey === currentNews.uniquekey);
    if(isExist) {
      newsList = newsList.filter((item: INewsInfo) => item.uniquekey !== currentNews.uniquekey);
      followStatus = false;
    } else {
      newsList.push(currentNews);
      // 加入收藏
      followStatus = true; 
    }
  } else {
    // 將目前新聞加入新聞列表
    newsList.push(currentNews);
    // 加入收藏
    followStatus = true;
  }

  localStorage.setItem('newsList', JSON.stringify(newsList));
  callback(followStatus);
}

function useFollowedCheck(route: RouteLocationNormalizedLoaded, callback: (status: boolean) => void) {
  const uniquekey = route.params.uniquekey;
  const pageFrom = route.params.from;

  // 是否為收藏的新聞
  if(pageFrom === 'MyNews') {
    callback(true);
    return;
  }

  // 確認localStorage有無新聞列表
  const newsList: INewsInfo[] = JSON.parse(localStorage.getItem('newsList') || '[]');

  // 沒有新聞列表
  if(!newsList.length) {
    // 沒有收藏
    callback(false);
    return;
  }
  
  // 檢查當前的uniquekey是否存在newsList中的某一條新聞
  const isExist: INewsInfo | undefined = newsList.find((item: INewsInfo) => item.uniquekey === uniquekey);
  // 
  callback(isExist ? true: false);
}

export {
  useDetailInfo,
  useFollowedCheck,
  useNewsFollow
}