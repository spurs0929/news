import { headerInfos } from "@/router";
import { IGlobalState } from "@/store";
import { IHeaderInfo, IHomeState, INewsInfo, IPostData, NAV_TYPES } from "@/typings";
import _ from "lodash";
import { computed, onMounted, Ref } from "vue";
import { Store } from "vuex";

// 獲取header對應的路由訊息
function useRouteInfo(routeName: string): IHeaderInfo | undefined{
    const routeInfo: IHeaderInfo | undefined = headerInfos.find((item: IHeaderInfo) => item.name === routeName);

    return routeInfo;
}

// 圖片淡入
function useImgShow(imgRefs: Ref<null | HTMLElement>[]): void {
  // 收集Item裡所有圖片的ref
  imgRefs.map((imgRef) => {
    const oImage = imgRef.value!;

    // 圖片加載完成
    oImage.onload = function() {
      // 修改透明度
      oImage.style.opacity = '1';
    }
  })
}
// 
/**
 * 加載更多
 * @param store {store<IGlobalState>} 倉庫
 * @param module {string} store的模組名
 * @param actionType {string} action type  
 * @param element {Ref<null | HTMLElement>} list元素
 */
function useLoadingMore(store: Store<IGlobalState>, module: string, actionType: string, element: Ref<null | HTMLElement>) {
  let el: HTMLElement;
  let state: IHomeState;

  // 型別斷言
  switch(module) {
    case 'homw': 
      state = store.state.home as IHomeState;
      break;
    default: 
      break;
  }

  onMounted(() => {
    // 型別斷言
    el = element.value as HTMLElement;

    // 列表元素綁定scroll事件處理函數並加上loadash防抖
    el.addEventListener('scroll', _.debounce(_loadMore, 300), false);
  });

  function _loadMore(): void {
    const listHeight: number = el.clientHeight;
    const scrollHeight: number = el.scrollHeight;
    const scrollTop: number = el.scrollTop;

    const type: NAV_TYPES = computed(() => state.currentType).value;
    const pageNum: number = computed(() => state.newsList.pageNum).value;
    const count: number = computed(() => state.newsList.count).value;

    // 列表高 + 滾動top值 >= 滾動高度 - 30 ，代表在有30像素就到底
    if(listHeight + scrollTop >= scrollHeight - 30) {
      store.dispatch(`${module}/${actionType}`, <IPostData>{
        type, pageNum, count
      })
    }
  }

  return {
    isLoading: computed(() => state.newsList.isLoading),
    hasMore: computed(() => state.newsList.hasMore)
  }
}


export {
  useRouteInfo,
  useImgShow,
  useLoadingMore
}