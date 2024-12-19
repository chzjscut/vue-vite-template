<template>
  <div>
    <div class="title">ref 被用来给元素或子组件注册引用信息。</div>
    <div class="error">$refs 不是响应式的</div>
    <div class="mt20">
      <div>以下通过 this.refs[`button1`] 将返回一个长度为 1 的数组（数组项为对应的 el-button 实例）</div>
      <el-button
        v-for="item in [1, 2, 3]"
        :key="item"
        :ref="`button${item}`"
        @click="getRef(item)"
      >按钮{{item}}</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  //name: 'RefAttr',
  components: {
  },
  data() {
    return {
      
    }
  },
  methods: {
    getRef(key: number) {
      console.log(this.$refs[`button${key}`]);
    }
  }
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