<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-11 18:34:10
 * @LastEditTime: 2022-04-12 11:44:11
 * @LastEditors: HanYongHui
-->
<template>
  <web-view :src="webUrl"></web-view>
</template>
<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "@vue/reactivity";
const agreementType = ref<number>(1);
const webUrl = ref<string>(
  "https://op.dabanjia.com/static/dbj-protocol/protocol.html"
);
onLoad((e: any) => {
  agreementType.value = +e.agreementType;
  switch (agreementType.value) {
    case 1:
      webUrl.value =
        "https://op.dabanjia.com/static/dbj-protocol/protocol.html";
      break;
    case 2:
      webUrl.value =
        "https://op.dabanjia.com/static/dbj-protocol/privacy-policy.html";
      break;
  }
});
</script>
<style lang="scss" scoped>
</style>