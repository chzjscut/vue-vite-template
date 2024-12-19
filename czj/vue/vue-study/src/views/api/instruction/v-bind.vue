<template>
  <div>
    <div class="example-container">
      <div class="sub-section">
        <div class="bold">动态绑定 attribute</div>
        <div class="item-wrap">
          <!-- 动态 attribute 名 (2.6.0+) -->
          <!-- 缩写 :[key]="value" -->
          <button v-bind:[key]="value">绑定attribute</button>
          <!-- 绑定一个全是 attribute 的对象 -->
          <div v-bind="attrObj">我是一个div</div>
        </div>
      </div>
      <div class="sub-section">
        <div class="bold">.sync 修饰符</div>
        <ol type="a">
          <li>(2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器</li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'VBind',
  data() {
    return {
      key: 'id',
      value: 1,
      attrObj: {
        id: 'mydiv',
        name: 'div'
      },
    }
  },
});
</script>
<style lang="scss" scoped>
  .option-row {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .example-container {
    margin-top: 20px;
  }
  .sub-section {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    
    & > div {
      line-height: 28px;
    }
    .item-wrap {
      padding: 10px;
      background-color: #dae5e7;
      & + .item-wrap {
        margin-top: 10px;
      }
    }
  }
</style>