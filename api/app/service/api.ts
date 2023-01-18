/* eslint-disable */
import { Service } from 'egg';
import { IGetNewsListParams, IHttpGetParamas, INewsData, IPageData } from '../../typings';
import { getPageData } from '../lib/utils';

/**
 * Test Service
 */
export default class API extends Service {

  public async getNewsList({ type, pageNum, count }: IGetNewsListParams): Promise<IPageData<INewsData>> {
    const { ctx } = this;
    // 設置預設值
    const pageNumber: number = pageNum || 0;
    const pageCount: number = count || 10;

    // 請求資料
    return ctx.httpGet(<IHttpGetParamas>{
      url: ctx.app.config.API.GET_NEWS_LIST,
      data: {
        type: type || 'top'
      },
      success(data) {
        // 根據pageNumber和pageCount切換返回的分頁資料
        return getPageData<INewsData>(data, pageNumber, pageCount);
      },
      fail(err) {
        throw new Error('Request failed' + err);
      }
    })
  }
}
