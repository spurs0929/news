/* eslint-disable */

import { IPageData } from "../../typings";

// 簡易封裝typeOf方法
function typeOf(value: string): string{
  // 排除null
  if(value === null){
    return 'null';
  }

  if(typeof(value) === 'object'){
    const toStr = Object.prototype.toString;
    const types = {
      '[object Object]': 'Object',
      '[object Array]': 'Array'
    };
    return types[toStr.call(value)]
  } else {
    return typeof(value);
  }
}

// 參數格式處理
function formatParams(data: any, appKey: string): string{
  // data必須是物件類型
  if(typeOf(data) !== 'Object'){
    throw new Error('Options "data" must be a type Object');
  }
  
  // 串接字串以?開頭
  let paramStr: string = '?';

  // 參數字串合併
  for(let key in data){
    paramStr += `${key}=${data[key]}&`;
  }

  // 判斷appKey是否存在
  return appKey ? paramStr + 'key=' + appKey : paramStr.slice(0, -1);
}

// 分頁資料
function getPageData<T>(data: Array<T>, pageNum: number, count: number): IPageData<T> {
  // hasMore 是否有更多資料
  // data 當前頁的資料
  const retInfo: IPageData<T> = {
    hasMore: true,
    data: []
  }

  // 資料只有一頁
  if(data.length <= count){
    retInfo.data?.concat(data);
    retInfo.hasMore = false;
  } else { 
    // 有更多頁
    
    // 獲取頁數
    const pageCount: number = Math.ceil(data.length / count);

    // 頁碼大於等於頁數
    if(pageNum >= pageCount){
      retInfo.data = null;
      retInfo.hasMore = false;
    } else {
      // 頁碼小於頁數 
      retInfo.data = data.splice(pageNum * count, count);
      retInfo.hasMore = true;
    }
  }

  return retInfo;
}

export {
  typeOf,
  formatParams,
  getPageData
}