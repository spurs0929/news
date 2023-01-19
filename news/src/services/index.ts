import axios from "@/lib/http";
import { IPostData, NAV_TYPES } from "@/typings";

function getNewsList<T>(options: IPostData) {
  const { type, pageNum, count } = options;
  return axios.post<T, T>('/api/news_list', {
    type,
    pageNum,
    count
  }).then((data) => {
    return data;
  }).catch((err) => {
    throw new Error('Request failed:' + err)
  })
}

export {
  getNewsList
}