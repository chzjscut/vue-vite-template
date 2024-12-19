<template>
  <div>
    <el-button @click="add">id: {{obj.id}}</el-button>
    <com-a />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ComA from './ComA.vue';

export default Vue.extend({
  components: {
    ComA
  },
  data() {
    return {
      obj: {
        id: 1
      }
    }
  },
  provide(): any {
    return {
      foo: 'bar',
      // id: this.id,
      /**
       * 如果像上面这样写 id 在 inject的组件内不是响应式的。若想变为响应式，有两种方法：
       *  1、传递一个function，函数返回值为实际想要传递的字段；
       *  2、在 data 中定义一个对象，对象中包含要传递的字段，provide 中直接传递这个对象。
       **/
      // id: () => this.id; //这样写是响应式的
      obj: this.obj //这样写是响应式的；在inject的组件中直接获取 obj 中的 prop
    }
  },
  methods: {
    add() {
      this.obj.id++;
    }
  }
});
</script>