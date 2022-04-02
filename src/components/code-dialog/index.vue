<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-02 16:29:52
 * @LastEditTime: 2022-04-02 18:35:28
 * @LastEditors: HanYongHui
-->
<template>
  <view class="dialog-warp" v-show="props.show" @click="close">
    <view class="dialog_content">
      <view class="dialog_content--head"> </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { defineComponent, defineProps, defineEmits } from "vue";
const props = defineProps({
  codeUrl: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:show"]);
const close = () => {
  emit("update:show", false);
};
</script>
<style lang="scss" scoped>
.dialog-warp {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  // transition: 0.3s;

  .dialog_content {
    width: 466rpx;
    height: 726rpx;

    .dialog_content--head {
      width: 100%;
      height: 162rpx;
      display: flex;
      align-items: center;

      .avatar-image {
        margin-left: 40rpx;
        width: 68rpx;
        height: 68rpx;
      }

      .describe {
        margin-left: 16rpx;
        display: flex;
        flex-direction: column;
        text:nth-child(1) {
          font-weight: bold;
          font-size: 28rpx;
          line-height: 40rpx;
          /* identical to box height */
          color: #333333;
        }
        text:nth-child(2) {
          font-weight: 400;
          font-size: 22rpx;
          line-height: 30rpx;
          color: #999999;
        }
      }
    }
    .dialog_content--code {
    }
  }
}
</style>