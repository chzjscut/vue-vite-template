<template>
  <div>
    <div class="page-title">组件</div>
    <div class="tags">
      <tag
        v-for="tag in options"
        :key="tag"
        :tag="tag"
        :activeTag="currentOption"
        @select="onSelect(tag)"
      />
    </div>

    <section-module :title="`组件: ${currentOption}`">
      <!-- 组件通信 -->
      <div v-if="currentOption === options[0]">
        <!-- 通过 v-bind="testObj" 传递testObj的所有property -->
        <div>1、可以通过 v-bind="obj" 格式传递 obj 的所有 property</div>
        <div>2、通过v-on监听子组件事件时，内联表达式中可以通过$event获取到第一个参数</div>
        <div>3、如果传递的property不包含在子组件的props中，则该property会被当做普通的attribute传递给子组件(class和style除外)；
          这些attribute默认会自动添加到子组件的根元素上；如果不想添加到根元素上，则可以在子组件中设置：inheritAttrs: false。
          （下面例子中的 placeholder 就是一个attribute）</div>
        <Communication
          v-bind="testObj"
          placeholder="enter your name"
          @update-title="testObj.title = $event"
          @update-multi="onUpdate"
        />
      </div>

      <!-- 插槽 -->
      <template v-if="currentOption === options[1]">
        <div class="section">
          <div class="section-title primary">基本使用：</div>
          <el-row :gutter="12">
            <el-col :span="12">
              <!-- 具名插槽 -->
              <slot-component
                :isNamedSlot="true"
                :title="namedSlotTitle"
              >
                <template v-slot:default>
                  <div>默认插槽</div>
                </template>
                
                <!-- 具名插槽写法 -->
                <template v-slot:header>
                  <div>我是具名插槽</div>
                </template>
              </slot-component>
            </el-col>
            <el-col :span="12">
              <!-- 作用域插槽 -->
              <slot-component
                :isScopeSlot="true"
                :title="scopeSlotTitle"
                :row="scopeSlotData"
              >
                <template v-slot:default="scope">{{scope.row.alias}}</template>
                <template v-slot:fill="scope">{{scope.row.alias}}</template>
              </slot-component>
            </el-col>
          </el-row>
        </div>

        <div class="section mt10">
          <div class="section-title primary">插槽简写：</div>
          <div class="bold">1、v-slot:xxx 简写为 #xxx</div>
          <el-row :gutter="12">
            <el-col :span="12">
              <slot-component
                :isNamedSlot="true"
                :title="namedSlotTitle"
              >
                <!-- v-slot:default 简写为 #default -->
                <template #default>
                  <div>默认插槽</div>
                </template>
                
                <!-- v-slot:header 简写为 #header -->
                <template #header>
                  <div>我是具名插槽</div>
                </template>
              </slot-component>
            </el-col>
            <el-col :span="12">
              <slot-component
                :isScopeSlot="true"
                :title="scopeSlotTitle"
                :row="scopeSlotData"
              >
                <!-- v-slot:default="scope" 可以简写为: v-slot="scope" -->
                <!-- 还可简写为: #default="scope" -->
                <template #default="scope">{{scope.row.alias}}</template>
                <!-- v-slot:fill 简写为: #fill -->
                <template #fill="{row}">{{row.alias}}</template>
              </slot-component>
            </el-col>
          </el-row>
          <div class="mt20 bold">2、当被提供的内容只有默认插槽时，组件的标签可以被当作插槽的模板来使用</div>
          <el-row :gutter="12">
            <el-col :span="12">
              <slot-component
                :isNamedSlot="true"
                :title="namedSlotTitle"
                v-slot:default="scope"
              >
                <div>默认插槽</div>
              </slot-component>
            </el-col>
            <el-col :span="12">
              <slot-component
                :isScopeSlot="true"
                :title="scopeSlotTitle"
                :row="scopeSlotData"
                v-slot="scope"
              >
                {{scope.row.alias}}
              </slot-component>
            </el-col>
          </el-row>
        </div>
        <div class="section mt10">
          <div class="section-title primary">解构插槽 Prop：</div>
          <el-row :gutter="12">
            <el-col :span="12">
              <div class="bold">1、插槽 prop 解构</div>
              <slot-component
                :isScopeSlot="true"
                :title="scopeSlotTitle"
                :row="scopeSlotData"
              >
                <template v-slot:default="{ row }">{{row.alias}}</template>
                <template v-slot:fill="{ row }">{{row.alias}}</template>
              </slot-component>
            </el-col>
            <el-col :span="12">
              <div class="bold">2、还可以定义初始值，用于插槽 prop 是 undefined 的情形</div>
              <!-- newData 值为undefined -->
              <slot-component
                :isScopeSlot="true"
                :title="scopeSlotTitle"
                :row="newData"
              >
                <template #default="{row = {alias: 'laowang'}}">初始值：{{row.alias}}</template>
                <template v-slot:fill="{row = {alias: 'laowang'}}">初始值：{{row.alias}}</template>
              </slot-component>
            </el-col>
          </el-row>
        </div>
      </template>
    </section-module>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Tag from '@/components/Tag.vue';
import Communication from './components/Communication.vue';
import SlotComponent from './components/Slot.vue';

export default Vue.extend({
  name: 'ComponentExampleIndex',
  components: {
    Tag,
    Communication,
    SlotComponent,
  },
  data() {
    return {
      options: ['通信(父子组件)', '插槽',],
      currentOption: '通信(父子组件)',
      communicationTitle: '我是communication组件',
      namedSlotTitle: '插槽组件：具名插槽',
      scopeSlotTitle: '插槽组件：作用域插槽',
      scopeSlotData: {
        id: 1,
        age: 20,
        name: '小明',
        alias: 'xiaoming'
      },
      testObj: {
        id: 1,
        title: '子组件标题'
      },
      newData: undefined
    }
  },
  methods: {
    onSelect(value: string) {
      this.currentOption = value;
    },
    onUpdate(a: string, b: string, c: string) {
      console.log(a, b, c)
    }
  }
});
</script>
<style lang="scss" scoped>
  .section {
    padding: 10px;
    box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.08);
    .section-title {
      font-weight: bold;
      padding: 10px 0;
    }
  }
</style>