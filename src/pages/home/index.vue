<!--
 * @Description: 主页
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:39
 * @LastEditTime: 2022-03-31 18:11:24
 * @LastEditors: HanYongHui
-->
<template>
  <view class="list">
    <house-list v-for="item in 4" :key="item" :item="{}" />
  </view>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import HouseList from "./components/house-list.vue";
export default defineComponent({
  name: "",
  components: {
    HouseList,
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