<template>
  <div>
    <div class="page-title">数据</div>
    <!-- 
      *data
      *props
      *propsData
      computed
      watch
      methods
     -->
    <div class="tags">
      <tag
        v-for="tag in optionsData"
        :key="tag"
        :tag="tag"
        :activeTag="currentOption"
        @select="onSelect(tag)"
      />
    </div>
    <section-module :title="`选项/数据: ${currentOption}`">
      <template v-if="currentOption === 'props'">
        
      </template>
      <template v-if="currentOption === 'computed'">
        <div>边长为{{sideLength}}的正方形的周长为: {{girth}}</div>
        <button @click="sideLength += 10">边长+10</button>
        <button @click="girth += 20">周长+20</button>
      </template>
      <template v-if="currentOption === 'watch'">
        <div>类型：{ [key: string]: string | Function | Object | Array }</div>
        <div style="margin: 10px 0">详细：一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个 property。</div>
        <input v-model="searchText" placeholder="输入搜索内容">
        <input v-model="searchText2" placeholder="输入搜索内容">
        <input v-model="searchText3" placeholder="输入搜索内容">
        <select placeholder="搜索结果">
          <option v-for="item in filterList" :key="item">{{item}}</option>
        </select>
      </template>
    </section-module>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Tag from '@/components/Tag.vue';
import { Data } from './types.d';

const list = ['abc', 'defg', 'hijk', 'lmn', 'opq', 'rst', 'uvw', 'xyz'];

export default Vue.extend({
  name: 'OptionsData',
  components: {
    Tag,
  },
  data(): Data {
    return {
      optionsData: ['data', 'props', 'propsData', 'computed', 'watch', 'methods'],
      currentOption: 'data',
      sideLength: 10,
      searchText: 'q',
      searchText2: 'q',
      searchText3: '',
      filterList: list
    }
  },
  computed: {
    girth: {
      get: function(): number {
        return this.sideLength * 4;
      },
      set: function(newVal: number) {
        this.sideLength = newVal / 4;
      }
    }
  },
  watch: {
    searchText: function(val, oldVal) {
      setTimeout(() => {
        this.filterList = list.filter(item => val.trim() ? item.includes(val.trim()) : item);
      }, 500);
    },

    // 回调将会在侦听开始之后被立即调用
    searchText2: {
      handler: 'onSearch', //也可以通过设置方法名
      immediate: true,
      deep: true, //当存在嵌套属性时可以设置该字段
    },

    //也可以传入回调数组，它们会被逐一调用
    searchText3: [
      'onSearch3',
      function() {
        console.log(2);
      },
      {
        handler: function() {
          console.log(3);
        }
      }
    ]
  },
  methods: {
    onSelect(value: string) {
      this.currentOption = value;
    },
    onSearch(val: string, oldVal: string) {
      setTimeout(() => {
        this.filterList = list.filter(item => val.trim() ? item.includes(val.trim()) : item);
      }, 500);
    },
    onSearch3() {
      console.log(1);
    }
  }
});
</script>