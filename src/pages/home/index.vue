<!--
 * @Description: 主页
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:39
 * @LastEditTime: 2022-03-29 20:10:41
 * @LastEditors: HanYongHui
-->
<template>
  <view>楼盘{{ count }}</view>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "",
  components: {},
  setup() {
    const count = ref<number>(1);
    return {
      count,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>