// 路由對應的Header設置
interface IHeaderInfo {
  name: string,
  title: string,
  left: boolean,
  right: boolean,
  leftIcon: string,
  rightIcon: string,
  leftPath: string,
  rightPath: string
}

// 新聞類型的枚舉
enum NAV_TYPES {
  TOP = 'top',
  SHEHUI = 'shehui',
  GUONEI = 'guonei',
  GUOJI = 'guoji',
  YULE = 'yule',
  TIYU = 'tiyu',
  JUNSHI = 'junshi',
  KEJI = 'keji',
  CAIJING = 'caijing',
  SHISHANG = 'shishang'
}

// 請求資料的參數類型
interface IPostData {
  type: NAV_TYPES,
  pageNum: number,
  count: number
}

export {
  IHeaderInfo,
  NAV_TYPES,
  IPostData
}