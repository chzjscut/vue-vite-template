<template>
  <div>
    <div class="page-title">事件</div>
    <section-module title="0、动态事件(2.6.0+)">
      <!-- 缩写：@[eventName]="onDynamic" -->
      <button v-on:[eventName]="onDynamic">事件名称：{{eventName}}</button>
      <button @click="eventName = 'mouseover'">改变事件名称</button>
    </section-module>
    <section-module title="1、获取原始DOM事件">
      <!-- 用特殊变量 $event 可以访问原始DOM事件（参数位置可以任意） -->
      <button v-on:click="onClick(1, $event, '1001')">按钮1</button>
    </section-module>

    <!-- 直接在组件根元素上监听原生事件需要用.native修饰符，否则不生效 -->
    <section-module
      style="background: #ccc"
      title="2、事件修饰符"
      @click.native="onParentClick"
    >
      <!-- 
        .stop
        .prevent
        .self
        .once - 其他修饰符只能对原生DOM起作用，而.once还能被用到自定义的组件事件上
        .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调
        .native - 监听组件根元素的原生事件
        .capture  - 添加事件侦听器时使用 capture 模式
        .passive - (2.3.0) 以 { passive: true } 模式添加侦听器
        .left - (2.2.0) 只当点击鼠标左键时触发。
        .right - (2.2.0) 只当点击鼠标右键时触发。
        .middle - (2.2.0) 只当点击鼠标中键时触发。
      -->

      <!-- 阻止事件冒泡 -->
      <button v-on:click.stop="onChildClick">按钮2</button>
      <!-- 阻止浏览器默认行为: 不会再跳转 -->
      <a href="https://www.baidu.com" v-on:click.prevent="onPreventClick">链接</a>
      
      <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
      <!-- 即事件不是从内部元素触发的 -->
      <div style="height: 50px;margin-top: 10px; background: yellow" @click.self="onSelfClick">
        <div style="background: green">.self修饰符</div>
      </div>
      <!-- 只会调用一次 -->
      <button v-on:click.once="onOnceClick">按钮3</button>
      <!-- 如果不加.capture会先onChildClick后onCaptureClick，加了.capture会反过来 -->
      <div style="height: 50px;margin-top: 10px; background: orange" @click.capture="onCaptureClick">
        <div style="background: red" @click="onChildClick">.capture修饰符</div>
      </div>

      <!-- 同时使用多个修饰符时会按顺序执行对应代码 -->
      <!-- v-on:click.prevent.self 会阻止所有的点击：点击内部的a标签不会跳转 -->
      <div style="height: 50px;margin-top: 10px; background: yellow" @click.prevent.self="onSelfClick">
        <a href="https://www.baidu.com">链接</a>
      </div>
      <!-- v-on:click.self.prevent 只会阻止对元素自身的点击：点击内部的a标签正常跳转 -->
      <div style="height: 50px;margin-top: 10px; background: yellow" @click.self.prevent="onSelfClick">
        <a href="https://www.baidu.com">链接</a>
      </div>
    </section-module>
    <section-module title="3、按键修饰符">
      <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
      <input v-on:keyup.enter="onSubmit">
      <input v-on:keyup.13="onSubmit">
      <!-- PageDown按键（转换为 kebab-case） -->
      <input v-on:keyup.page-down="onPageDown">
    </section-module>
    <section-module title="4、系统修饰键">
      <!-- 
        .ctrl
        .alt
        .shift
        .meta
       -->

      <!-- Alt + C -->
      <input v-on:keyup.alt.67="onClear">
      <!-- Ctrl + Click -->
      <div v-on:click.ctrl="onCtrlClick">ctrl click</div>
    </section-module>
    <section-module title="5、鼠标按钮修饰符">
      <!-- 
        .left
        .right
        .middle
       -->
    </section-module>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EventHandle',
  data() {
    return {
      eventName: 'click',
    }
  },
  methods: {
    onDynamic() {
      console.log('dynamic event');
    },
    onClick(type: number, event: Event, id: string) {
      console.log(type, event, id);
      //event.preventDefault();
      //event.stopPropagation();
    },
    onParentClick() {
      console.log('parent');
    },
    onChildClick() {
      console.log('child');
    },
    onPreventClick() {
      console.log('preventDefault');
    },
    onSelfClick() {
      console.log('self')
    },
    onOnceClick() {
      console.log('once')
    },
    onCaptureClick() {
      console.log('capture')
    },
    onSubmit() {
      console.log('submit')
    },
    onPageDown() {
      console.log('pageDown')
    },
    onClear() {
      console.log('clear')
    },
    onCtrlClick() {
      console.log('ctrl click')
    }
  }
});

</script>