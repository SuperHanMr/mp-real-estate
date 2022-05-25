<!--
 * @Description: 商品套包详情
 * @Author: HanYongHui
 * @Date: 2022-05-16 14:13:56
 * @LastEditTime: 2022-05-24 12:15:49
 * @LastEditors: HanYongHui
-->
<template>
  <view class="page-content">
    <web-view
      :src="`${baseUrl}/app-pages/mp-real-estate/product-bundle.html?schemeId=${schemeId}&caseBagName=${caseBagName}`"
    />
    <!-- <web-view
      src="https://3d-mould.dabanjia.com/player2/preview/?modelId=169&time=1629959586853"
    ></web-view> -->
  </view>
</template>
<script lang="ts" setup>
import { defineProps, ref } from "vue";
const props = defineProps({
  schemeId: {
    type: Number,
  },
  caseBagName: {
    type: String,
  },
});
console.log("props", props);
const baseUrl = ref<string>(import.meta.env.VITE_URL_BASE_H5 as string);
// baseUrl.value = "https://localhost";
</script>
<style lang="scss" scoped>
.page-content {
  width: 100%;
  height: 100%;
}
</style>