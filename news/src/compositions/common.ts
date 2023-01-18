import { headerInfos } from "@/router";
import { IHeaderInfo } from "@/typings";

function useRouteInfo(routeName: string): IHeaderInfo | undefined{
    const routeInfo: IHeaderInfo | undefined = headerInfos.find((item: IHeaderInfo) => item.name === routeName);

    return routeInfo;
}

export {
  useRouteInfo
}