<!--
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:00:01
 * @LastEditTime: 2022-04-11 20:58:09
 * @LastEditors: HanYongHui
-->
<template>
  <detail :estateId="1" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { onLoad, onShareAppMessage, onPageScroll } from "@dcloudio/uni-app";
import detail from "./components/detail.vue";

export default defineComponent({
  name: "",
  components: {
    detail,
  },
  setup() {
    const id = ref<number>(0);
    onLoad((e: any) => {
      id.value = e.id;
    });
    onPageScroll((e) => {
      if (e.scrollTop > 64) {
        // theme.value = "white";
      } else {
        // theme.value = "transparent";
      }
    });
    onShareAppMessage(() => {
      return {
        title: "楼盘详情",
        path: `/pages/estate-detail/index?id=${id.value}`,
      };
    });
    return {
      id,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>