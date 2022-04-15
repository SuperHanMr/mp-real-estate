<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-11 18:34:10
 * @LastEditTime: 2022-04-14 14:33:38
 * @LastEditors: HanYongHui
-->
<template>
  <view>{{ agreementType }}</view>
  <web-view :src="webUrl"></web-view>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "@vue/reactivity";
const props = defineProps({
  agreementType: {
    type: String,
  },
});
const webUrl = ref<string>("");
switch (props.agreementType) {
  case "1":
    webUrl.value = "https://op.dabanjia.com/static/dbj-protocol/protocol.html";
    break;
  case "2":
    webUrl.value =
      "https://op.dabanjia.com/static/dbj-protocol/privacy-policy.html";
    break;
}
</script>
<style lang="scss" scoped>
</style>