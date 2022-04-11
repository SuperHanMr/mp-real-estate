<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-11 18:34:10
 * @LastEditTime: 2022-04-11 18:37:37
 * @LastEditors: HanYongHui
-->
<template>
  <web-view :src="webUrl"></web-view>
</template>
<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "@vue/reactivity";

const webUrl = ref<string>("");
onLoad((e: any) => {
  webUrl.value = e.webUrl;
});
</script>
<style lang="scss" scoped>
</style>