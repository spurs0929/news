/* eslint-disable */
import { Controller } from 'egg';
import { IGetNewsListParams } from '../../typings';

export default class ApiController extends Controller {
  public async getNewsList(): Promise<void> {
    const { ctx } = this;
    // 從請求體內拿到請求參數
    const { type, pageNum, count }: IGetNewsListParams = ctx.request.body;

    // 執行service內的getNewsList方法，請求資料
    ctx.body = await ctx.service.api.getNewsList({ type, pageNum, count });
  }
}
