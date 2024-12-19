<template>
  <div class="subContainer">
    <div>{{ title }}</div>
    <div class="mt20">{{`placeholder: ${$attrs.placeholder}`}}</div>
    <div><input v-bind="$attrs"></div>
    <div class="mt20">
      <button @click="$emit('update-title', '名称变了')">修改标题</button>
      <button @click="$emit('update-multi', 'param_1', 'param_2', 'param_3')">多个参数</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  //禁止根元素继承 attribute
  inheritAttrs: false,
  props: {
    id: Number,
    title: String,
  },
});
</script>
<style lang="scss" scoped>
  .subContainer {
    margin-top: 15px;
    padding: 10px;
    background-color: #e1e1e1;
  }
</style>