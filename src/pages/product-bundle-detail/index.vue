<!--
 * @Description: 商品套包详情
 * @Author: HanYongHui
 * @Date: 2022-05-16 14:13:56
 * @LastEditTime: 2022-05-17 11:07:21
 * @LastEditors: HanYongHui
-->
<template>
  <view class="page-content">
    <web-view
      :src="`${baseUrl}/app-pages/mp-real-estate/product-bundle.html?id=${id}`"
    ></web-view>
  </view>
</template>
<script lang="ts" setup>
import { defineProps, ref } from "vue";
const props = defineProps({
  id: {
    type: [Number, String],
  },
});
const baseUrl = ref<string>(import.meta.env.VITE_URL_BASE_H5 as string);
</script>
<style lang="scss" scoped>
.page-content {
  width: 100%;
  height: 100%;
}
</style>