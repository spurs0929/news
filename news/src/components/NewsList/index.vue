<template>
  <div 
    class="news-list"
    :style="{ 'top': '.' + top + 'rem' }"
    ref="newsListRef"
  >
    <template
      v-for="item of newsData"
    >
      <news-item-0
        v-if="!item.thumbnail_pic_s"
        :item="item"
        :key="item.uniquekey"
        :pageFrom="pageFrom"
      />
      <news-item-1
        v-else-if="!item.thumbnail_pic_s02"
        :item="item"
        :key="item.uniquekey"
        :pageFrom="pageFrom"
      />
      <news-item-2
        v-else-if="!item.thumbnail_pic_s03"
        :item="item"
        :key="item.uniquekey"
        :pageFrom="pageFrom"
      />  
      <news-item-3
        v-else
        :item="item"
        :key="item.uniquekey"
        :pageFrom="pageFrom"
      />        
    </template>
    <loading v-if="isLoading" />
    <no-more v-if="!hasMore"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/runtime-core';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import { Store, useStore } from 'vuex';
import { INewsInfo } from '../../typings';
import { SET_NEWS_LIST } from '../../store/home/actionTypes';
import { useLoadingMore } from '../../compositions';

// 組件
import NewsItem0 from './items/item0.vue';
import NewsItem1 from './items/item1.vue';
import NewsItem2 from './items/item2.vue';
import NewsItem3 from './items/item3.vue';
import Loading from '../Loading/index.vue';
import NoMore from '../NoMore/index.vue';

export default defineComponent({
  name: "NewsList",
  components: {
    NewsItem0,
    NewsItem1,
    NewsItem2,
    NewsItem3,
    Loading,
    NoMore
  },
  props: {
    newsData: Array as PropType<INewsInfo[]>,
    top: Number
  },
  setup() {
    const pageFrom = ref<string>('');
    const newsListRef = ref<null | HTMLElement>(null);
    const route: RouteLocationNormalizedLoaded = useRoute();
    const store: Store<any> = useStore();

    const { isLoading, hasMore } = useLoadingMore(store, 'home', SET_NEWS_LIST, newsListRef)
    pageFrom.value = route.name as string;

    return {
      pageFrom,
      newsListRef,
      isLoading,
      hasMore
    }
  }
})
</script>

<style lang="scss">
  .news-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    background-color: #fff;
    overflow-y: auto;
  }
  .news-item {
    padding: .1rem .1rem 0;
    box-sizing: border-box;

    img {
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity .3s linear;
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.25rem;
      color: #999;
      border-bottom: 0.01rem solid #ededed;
      font-size: .12rem;

      .author {
        margin-left: 0.1rem;
      }
    }

    .title {
      padding: 0.05rem 0;
      line-height: .2rem;

      h1 {
        font-size: .16rem; 
      }
    }

    h1 {
      font-size: .16rem; 
    }

    &.type-1 {
      .main {
        display: flex;
        font-display: row;

        .pic {
          flex: 1;
          background-color: #eee;
          box-sizing: border-box;
        }

        .title {
          flex: 2;
          padding-left: 0.1rem;
          box-sizing: border-box;
        }
      }
    }

    &.type-2,
    &.type-3 {
      .pic {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      
        .img {
          width: 33.33%;
          flex: 1 1 auto;
          margin-right: 0.05rem;
          background-color: #eee;
          font-size: 0;

          &.last {
            margin: 0;
          }
        }
      }
    }
  }

</style>