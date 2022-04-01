<!--
 * @Description: 主页
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:39
 * @LastEditTime: 2022-03-31 21:26:21
 * @LastEditors: HanYongHui
-->
<template>
  <view class="list">
    <estate-list v-for="item in 4" :key="item" :item="{}" />
  </view>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import estateList from "./components/estate-list.vue";

export default defineComponent({
  name: "",
  components: {
    estateList,
  },
  onPullDownRefresh() {
    console.log("----下拉刷新---");
  },
  onLoad() {
    console.log("----初次加载---");
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.list {
  height: 100%;
  width: 100%;
}
</style>