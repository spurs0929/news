import { NAV_TYPES } from "./common"

// state.newsList類型
interface INewsList {
  hasMore: boolean,
  isLoading: boolean,
  pageNum: number,
  count: number,
  news: INewsInfo[]
}

// 每條news的類型
interface INewsInfo {
  uniqueKey: string,
  title: string,
  data: string,
  category: string,
  author_name: string,
  url: string,
  thumbnail_pic_s?: string,
  thumbnail_pic_s02?: string,
  thumbnail_pic_s03?: string
}

interface IHomeState {
  currentType: NAV_TYPES,
  newsList: INewsList
}

interface IDetailState {
  currentNews: INewsInfo
}

export {
  IHomeState,
  INewsInfo,
  INewsList,
  IDetailState
}