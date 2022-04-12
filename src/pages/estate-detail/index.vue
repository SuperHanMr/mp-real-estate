<!--
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:00:01
 * @LastEditTime: 2022-04-12 12:05:15
 * @LastEditors: HanYongHui
-->
<template>
  <navigation-custom title="楼盘详情" :theme="theme" />
  <detail :estateId="id" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { onLoad, onShareAppMessage, onPageScroll } from "@dcloudio/uni-app";
import detail from "./components/detail.vue";
import navigationCustom from "../../components/navigation-custom/index.vue";

export default defineComponent({
  name: "",
  components: {
    detail,
    navigationCustom,
  },
  setup() {
    const id = ref<number>(0);
    onLoad((e: any) => {
      id.value = e.id;
    });
    const theme = ref<"white" | "black" | "transparent">("transparent");
    onPageScroll((e) => {
      if (e.scrollTop > 64) {
        theme.value = "white";
      } else {
        theme.value = "transparent";
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
      theme,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>