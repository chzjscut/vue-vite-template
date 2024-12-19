<template>
  <div>
    <div class="example-container">
      <div>
        <div>绑定事件监听器。事件类型由参数指定。</div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div></div>
      </div>
    </div>
    <div class="example-container">
      <div>
        <div class="sub-section">
          <div class="bold">将原生事件绑定到组件</div>
          <ol type="a">
            <li>
              <span class="warning">监听原生事件时(通过.native)，默认是监听组件根元素。</span>
              所以，如果想监听某个 input 元素或者 a 标签的原生事件时，
              必须将该元素作为组件的根元素（如果通过诸如 div 包裹，父级的 .native 监听器将静默失败。）
            </li>
          </ol>
          <div></div>
          <div class="item-wrap">
            <div>1、根元素是 input</div>
            <v-on-component
              placeholder="example 1"
              v-model="value1"
              v-on:focus.native="onFocus('isFocus')"
              v-on:blur.native="onBlur('isFocus')"
            />
            <div>输入内容：{{ value1 }}; 是否聚焦：{{isFocus}}</div>
          </div>
          <div class="item-wrap">
            <div>2、根元素不是 input</div>
            <v-on-component
              placeholder="example 2"
              label="我是label"
              v-model="value2"
              v-on:keyup.enter.native="onKeyup"
              v-on:focus.native="onFocus('isFocus2')"
              v-on:blur.native="onBlur('isFocus2')"
            />
            <div>输入内容：{{ value2 }}; 是否聚焦：{{isFocus2}}</div>
          </div>
          <div>对于上面的情况2，监听原生事件失效，为了解决这个问题，Vue 提供了一个 $listeners 的实例属性：</div>
          <ol type="a" class="warning">
            <li>vm.$listeners 包含了父作用域中的 (<span class="error">不含 .native 修饰器的</span>) v-on 事件监听器。
              它可以通过 v-on="$listeners" 传入内部组件</li>
            <li>根据 a，在父元素中添加原生事件监听器时不必再使用 .native 修饰符。</li>
          </ol>
          <div class="item-wrap">
            <div>3、根元素不是 input（使用 $listeners）</div>
            <v-on-component
              placeholder="example 3"
              label="我是label"
              v-model="value3"
              :isUseListener="true"
              v-on:btn-click="onClick"
              v-on:focus="onFocus('isFocus3')"
              v-on:blur="onBlur('isFocus3')"
            />
            <div>输入内容：{{ value3 }}; 是否聚焦：{{isFocus3}}; 按钮点击了 {{ clickTimes }} 次。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import VOnComponent from './components/VOnComponent.vue';
import * as T from './types.d';

export default Vue.extend({
  name: 'VOn',
  components: {
    VOnComponent
  },
  data(): T.VOnData {
    return {
      value1: '',
      value2: '',
      value3: '',
      isFocus: false,
      isFocus2: false,
      isFocus3: false,
      isUseListener: false,
      clickTimes: 0,
    }
  },
  methods: {
    onFocus(prop: 'isFocus' | 'isFocus2' | 'isFocus3') {
      this[prop] = true;
    },
    onBlur(prop: 'isFocus' | 'isFocus2' | 'isFocus3') {
      this[prop] = false;
    },
    onClick() {
      this.clickTimes += 1;
    },
    onKeyup() {
      console.log(111)
    }
  }
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