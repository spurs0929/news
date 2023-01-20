<template>
  <div class="container">
    <nav-bar
      @setCurrentType="setCurrentType"
    >
    </nav-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Store, useStore } from 'vuex';
import { useNewsList } from '../compositions';
import NavBar from '../components/NavBar/index.vue';
import { NAV_TYPES } from "../typings";
import { useNavType } from "../compositions/home";

  export default defineComponent({
    name: 'Home',
    components: {
      NavBar
    },
    setup() {
      const store: Store<any> = useStore();
      // 返回新聞列表
      const newsList = useNewsList(store);
      // 返回修改類型的方法 
      const setCurrentType: (type: NAV_TYPES) => void = useNavType(store);  

      return {
        newsList,
        setCurrentType,
      }
   }
  })
</script>