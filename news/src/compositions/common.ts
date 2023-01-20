import { headerInfos } from "@/router";
import { IHeaderInfo, INewsInfo } from "@/typings";

// 獲取header對應的路由訊息
function useRouteInfo(routeName: string): IHeaderInfo | undefined{
    const routeInfo: IHeaderInfo | undefined = headerInfos.find((item: IHeaderInfo) => item.name === routeName);

    return routeInfo;
}

export {
  useRouteInfo,
}