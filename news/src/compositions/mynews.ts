import { INewsInfo } from "@/typings";

function useFollowedList(): INewsInfo[] | null {
  // 從localStorage取收藏的新聞列表
  const followedList: INewsInfo[] = JSON.parse(localStorage.getItem('newsList') || '[]');
  // 沒有收藏的新聞列表
  if(!followedList.length) {
    return null;
  }

  // 回傳收藏的新聞列表
  return followedList;
}

export {
  useFollowedList
}