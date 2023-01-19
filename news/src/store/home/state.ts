import { NAV_TYPES, IHomeState, INewsList } from "@/typings";

const state: IHomeState = {
  currentType: NAV_TYPES.TOP,
  newsList: <INewsList>{
    // 是否有更多資料
    hasMore: true,
    // 是否加載中
    isLoading: false,
    // 當前頁碼
    pageNum: 0,
    // 一頁顯示多少資料
    count: 10,
    // 新聞列表資料
    news: []
  }
}

export default state;