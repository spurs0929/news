<template>
  <div class="container">
    <iframe :src="url" class="frame"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import { useDetailInfo } from "../compositions";
import { INewsInfo } from "../typings";

export default defineComponent({
  name: 'Detail',
  setup() {
    const route: RouteLocationNormalizedLoaded = useRoute();
    const store: Store<any> = useStore();
    const router: Router = useRouter();

    // 接收新聞詳情訊息並綁定到view(url)
    const detailInfo: INewsInfo | undefined = useDetailInfo(store, route);

    // 找不到新聞詳情
    if(!detailInfo) {
      // 跳轉回首頁
      router.push('/');
      return;
    }

    return {
      url: detailInfo.url
    }
  }
});
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;

    .frame {
      width: 100%;
      height: 100%;
      margin-top: .44rem;
      border: 0;
      overflow-y: auto;
    }
  }
</style>