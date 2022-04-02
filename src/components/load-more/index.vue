<!--
 * @Description: 上拉加载更多
 * @Author: HanYongHui
 * @Date: 2022-04-01 11:40:32
 * @LastEditTime: 2022-04-02 11:24:29
 * @LastEditors: HanYongHui
-->
<template>
  <view class="load-more" v-if="props.loadType !== 'succeed'">
    <text>{{ loadText[props.loadType] }}</text>
  </view>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import type { PropType } from "vue";
type LoadType = "succeed" | "error" | "load" | "complete";
const props = defineProps({
  loadType: {
    type: String as PropType<LoadType>,
    required: true,
  },
});
const loadText = {
  error: "-加载失败-",
  load: "玩命加载中...",
  complete: "-暂无更多数据-",
};
</script>
<style lang="scss" scoped>
.load-more {
  width: 100%;
  height: 80rpx;
  display: flex;
  font-size: 24rpx;
  color: #ccc;
  justify-content: center;
  align-items: center;
}
</style>
