<template>
  <div>
    <div class="title">is 用于动态组件且基于 DOM 内模板的限制来工作。下面是一个动态组件的例子：</div>
    <el-radio-group v-model="currentTabComponent" size="small" class="mt20">
      <el-radio-button label="tab-a">tabA</el-radio-button>
      <el-radio-button label="tab-b">tabB</el-radio-button>
      <el-radio-button label="tab-c">tabC</el-radio-button>
    </el-radio-group>
    <component v-bind:is="currentTabComponent" class="tabContent"></component>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TabA from './TabA.vue';
import TabB from './TabB.vue';
import TabC from './TabC.vue';

export default Vue.extend({
  components: {
    TabA,
    TabB,
    TabC
  },
  data() {
    return {
      currentTabComponent: 'tab-a'
    }
  },
});
</script>
<style lang="scss" scoped>
  .title {
    font-weight: bold;
  }
  .tabContent {
    margin-top: 15px;
  }
</style>