<template>
  <div class="component">
    <div>我是一个组件(v-model值：{{checked}})</div>
    <div>
      <input type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">checkbox
    </div>
    <div>
      <button @click="$emit('change', !checked)">也可以点我</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    //注意：这里必须要声明这个prop
    checked: Boolean
  }
});
</script>
<style>
  .component {
    background-color: #ddd;
  }
</style>