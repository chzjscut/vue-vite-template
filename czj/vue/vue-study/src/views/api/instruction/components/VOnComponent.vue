<template>
  <div v-if="label">
    <label>
      {{ label }}
      <template v-if="isUseListener">
        <!--
          直接使用 v-on="$listeners", focus 和 blur 原生事件会正常生效，但是 因为外部使用了v-model，
          所以需要手动将 input 原生事件也添加进来(如 inputListeners 所做的)。
        -->
        <input
          v-bind="$attrs"
          v-bind:value="value"
          v-on="inputListeners"
        >
        <el-button
          size="mini"
          type="primary"
          style="margin-left: 10px"
          @click="$emit('btn-click')"
        >点击</el-button>
      </template>
      
      <input
        v-else
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
    
  </div>
  <input
    v-else
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  inheritAttrs: false, //不绑定attr到根元素
  props: {
    isUseListener: {
      type: Boolean,
      default: false
    },
    label: String,
    //注意：这里必须要声明这个prop
    value: String
  },
  data() {
    //let vm = this;
    return {

    }
  },
  computed: {
    inputListeners: function(): any {
      let vm = this;
      return Object.assign({},
        //从父级添加所有的监听器
        this.$listeners,
        // 添加自定义监听器(或覆写一些监听器的行为)
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function(e: Event) {
            vm.$emit('input', e && (e.target as HTMLInputElement).value);
          },
        }
      )
    }
  },
  mounted() {
    console.log(this.$listeners)
  }
});
</script>
<style>
  .component {
    background-color: #ddd;
  }
</style>