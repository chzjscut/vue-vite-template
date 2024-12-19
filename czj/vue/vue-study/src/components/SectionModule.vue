<template>
  <div class="module">
    <div class="module-title">{{title}}</div>
    <div class="module-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SectionModule',
  props: {
    title: String,
  }
});
</script>
<style lang="scss" scoped>
.module {
  margin: 15px;
  padding: 15px;
  border: 1px solid #ccc;
  .module-title {
    font-weight: bold;
    font-size: 18px;
    padding: 10px 0;
  }
  .module-content {
    margin-top: 10px;
    padding: 15px;
    background-color: #efefef;
  }
}
</style>