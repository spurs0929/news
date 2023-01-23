import 'egg';

interface IGetNewsListParams {
  type: string,
  pageNum: number,
  count: number
}

interface IHttpGetParamas {
  url: string,
  data: any,
  success: (data: any) => void,
  fail: (err: any) => void
}

interface IPageData<T> {
  data: Array<T> | null,
  hasMore: boolean
}

interface INewsData {
  uniquekey: string,
  title: string,
  data: string,
  category: string,
  author_name: string,
  url: string,
  thumbnail_pic_s?: string,
  thumbnail_pic_s02?: string,
  thumbnail_pic_s03?: string
}

declare module 'egg' {
  IHttpGetParamas,
  IGetNewsListParams,
  IPageData,
  INewsData
}