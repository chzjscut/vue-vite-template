<template>
  <div class="slot">
    <!-- 具名插槽 -->
    <template v-if="isNamedSlot">
      <div class="title">{{ title }}</div>
      <div style="color: #2973b7">
        <!-- 默认插槽(default) -->
        <slot>a default slot</slot>
      </div>
      
      <div style="color: red">
        <!-- 具名插槽 header -->
        <slot name="header"></slot>
      </div>
    </template>

    <!-- 作用域插槽 -->
    <template v-if="isScopeSlot">
      <div class="title">{{ title }}</div>
      <div><slot v-bind:row="row">{{ row.name }}</slot></div>
      <div class="fill"><slot name="fill" v-bind:row="row">{{ row.name }}</slot></div>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    isNamedSlot: {
      type: Boolean,
      default: false
    },
    isScopeSlot: {
      type: Boolean,
      default: false
    },
    title: String,
    row: {
      type: Object,
      // default: () => {
      //   return {}
      // }
    }
  },
  mounted() {
    this.$nextTick(function() {
      console.log(this.$slots)
    })
  }
});
</script>
<style lang="scss" scoped>
  .slot {
    padding: 15px 10px;
    border: 1px solid #ccc;
  }
  .title {
    margin-bottom: 15px;
    font-weight: bold;
  }
  .fill {
    padding: 5px 0;
    background-color: yellow;
  }
</style>