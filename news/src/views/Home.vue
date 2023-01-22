<template>
  <div class="container">
    <nav-bar
      @setCurrentType="setCurrentType"
    >
    </nav-bar>
    <sk-list
      :top="82"
      v-if="isSkLoading"
    />
    <news-list
      :newsData="newsList"
      :top="82"
    ></news-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue"
import { Store, useStore } from 'vuex';
// composition API
import { useNewsList } from '../compositions';
import { useNavType } from "../compositions/home";
// 型別
import { NAV_TYPES } from "../typings";
// 組件
import NavBar from '../components/NavBar/index.vue';
import NewsList from '../components/NewsList/index.vue';
import SkList from '../components/Skeleton/SkList.vue';

export default defineComponent({
  name: 'Home',
  components: {
    NavBar,
    NewsList,
    SkList
  },
  setup() {
    const store: Store<any> = useStore();
    // 返回新聞列表
    const newsList = useNewsList(store);
    // 返回修改類型的方法 
    const setCurrentType: (type: NAV_TYPES) => void = useNavType(store);  
    // skeleton顯示與否 
    const isSkLoading = ref<Boolean>(true);

    // 組件掛載完成後2s隱藏skeleton
    onMounted(() => {
      setTimeout(() => {
        isSkLoading.value = false;    
      }, 2000);
    });

    // 監聽state currentType 
    watch(() => {
      return store.state.home.currentType
    }, () => {
      isSkLoading.value = true;
      setTimeout(() => {
        isSkLoading.value = false;
      }, 2000)
    });

    return {
      newsList,
      setCurrentType,
      isSkLoading
    }
  }
})
</script>