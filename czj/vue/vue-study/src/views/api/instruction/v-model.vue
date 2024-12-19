<template>
  <div>
    <div class="option-row">
      <el-radio-group v-model="type">
        <el-radio :label="1">表单中使用</el-radio>
        <el-radio :label="2">自定义组件中使用</el-radio>
      </el-radio-group>
    </div>
    <div class="example-container" v-if="type === 1">
      <div>
        <div>v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：</div>
        <ul>
          <li>text 和 textarea 元素使用 value property 和 input 事件；</li>
          <li>checkbox 和 radio 使用 checked property 和 change 事件；</li>
          <li>select 字段将 value 作为 prop 并将 change 作为事件。</li>
        </ul>
        <div>下面是分别对比（模拟）不同表单元素的v-model实现：</div>
      </div>
      <!-- v-model实现: vue中模拟和原生模拟 -->
      <div>
        <div class="sub-section">
          <div class="bold">text 元素</div>
          <div class="item-wrap">
            <div>使用v-model：</div>
            <div>
              <label>input:</label>
              <input type="text" placeholder="输入信息" v-model="inputValue1">
            </div>
            <div>输入值：{{inputValue1}}</div>
          </div>
          <div class="item-wrap">
            <div>通过v-bind:value和v-on:input模拟实现：</div>
            <div>
              <label>input:</label>
              <input type="text" placeholder="输入信息" :value="inputValue2" @input="inputValue2 = $event.target.value">
            </div>
            <div>输入值：{{inputValue2}}</div>
          </div>
          <div class="item-wrap">
            <div>原生js模拟实现：</div>
            <div>
              <label>input:</label>
              <input id="myInput" @input="onInput">
            </div>
            <div>输入值：<span ref="inputDisplay"></span></div>
          </div>
        </div>
        <div class="sub-section">
          <div class="bold">select 元素</div>
          <div class="item-wrap">
            <div>使用v-model：</div>
            <div>
              <label>select:</label>
              <select
                placeholder="请选择"
                style="width: 170px"
                v-model="selectValue"
              >
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
              </select>
            </div>
            <div>选择了：{{selectValue}}</div>
          </div>
          <div class="item-wrap">
            <div>通过v-bind:value和v-on:change模拟实现：</div>
            <div>
              <label>select:</label>
              <select
                placeholder="请选择"
                style="width: 170px"
                :value="selectValue2"
                @change="selectValue2 = $event.target.value"
              >
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
              </select>
            </div>
            <div>选择了：{{selectValue2}}</div>
          </div>
          <div class="item-wrap">
            <div>原生js模拟实现：</div>
            <div>
              <label>select:</label>
              <select
                placeholder="请选择"
                style="width: 170px"
                id="mySelect"
                @change="onChange"
              >
                <option value="">请选择</option>
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
              </select>
            </div>
            <div>选择了：<span ref="selectDisplay"></span></div>
          </div>
        </div>
        <div class="sub-section">
          <div class="bold">radio 元素</div>
          <div class="item-wrap">
            <div>使用v-model：</div>
            <div>
              <label>radio:</label>
              <input type="radio" id="radio1" value="1" v-model="radioValue1">
              <label for="radio1">单选一</label>
              <input type="radio" id="radio2" value="2" v-model="radioValue1">
              <label for="radio2">单选二</label>
            </div>
            <div>选中值：{{radioValue1}}</div>
          </div>
          <div class="item-wrap">
            <div>通过v-bind:checked和v-on:change模拟实现：</div>
            <div>
              <label>radio:</label>
              <input
                type="radio"
                id="radio3"
                name="radio_a"
                value="1"
                @change="radioValue2 = $event.target.value"
              >
              <label for="radio3">单选一</label>
              <input
                type="radio"
                id="radio4"
                name="radio_a"
                value="2"
                @change="radioValue2 = $event.target.value"
              >
              <label for="radio4">单选二</label>
            </div>
            <div>选中值：{{radioValue2}}</div>
          </div>
          <div class="item-wrap">
            <div>原生js模拟实现：</div>
            <div>
              <label>radio:</label>
              <input type="radio" name="radio_b" id="radio5" value="1" @input="onRadioChange">
              <label for="radio5">单选一</label>
              <input type="radio" name="radio_b" id="radio6" value="2" @input="onRadioChange">
              <label for="radio6">单选二</label>
            </div>
            <div>选中值：<span ref="radioDisplay"></span></div>
          </div>
        </div>
        <div class="sub-section">
          <div class="bold">checkbox 元素</div>
          <div class="item-wrap">
            <div>使用v-model：</div>
            <div>
              <label>单个checkbox:</label>
              <input type="checkbox" id="checkbox" v-model="checkboxValue">
              <label for="checkbox">{{checkboxValue}}</label>
            </div>
            <div>
              <label>多个checkbox:</label>
              <input type="checkbox" id="checkbox1" value="1" v-model="checkboxValue1">
              <label for="checkbox1">选项一</label>
              <input type="checkbox" id="checkbox1_1" value="2" v-model="checkboxValue1">
              <label for="checkbox1_1">选项二</label>
            </div>
            <div>选中值：{{checkboxValue1}}</div>
          </div>
          <div class="item-wrap">
            <div>通过v-bind:checked和v-on:change模拟实现：</div>
            <div>
              <label>checkbox:</label>
              <input
                type="checkbox"
                id="checkbox2"
                name="checkbox_a"
                value="1"
                @change="onCheckboxChange"
              >
              <label for="checkbox2">选项一</label>
              <input
                type="checkbox"
                id="checkbox2_2"
                name="checkbox_a"
                value="2"
                @change="onCheckboxChange"
              >
              <label for="checkbox2_2">选项二</label>
            </div>
            <div>选中值：{{checkboxValue2}}</div>
          </div>
          <div class="item-wrap">
            <div>原生js模拟实现：</div>
            <div>
              <label>checkbox:</label>
              <input type="checkbox" name="checkbox_b" id="checkbox3" value="1" @input="onCheckboxChange2">
              <label for="checkbox3">选项一</label>
              <input type="checkbox" name="checkbox_b" id="checkbox3_3" value="2" @input="onCheckboxChange2">
              <label for="checkbox3_3">选项二</label>
            </div>
            <div>选中值：<span ref="checkboxDisplay"></span></div>
          </div>
        </div>
      </div>
      <div>
        <div>v-model可以使用修饰符:</div>
        <ul>
          <li>.lazy: 将默认的input 事件触发同步数据转为change 事件后同步;</li>
          <li>.number: 自动将输入值转为数值类型；</li>
          <li>.trim: 自动过滤输入的首尾空白字符。</li>
        </ul>
      </div>
    </div>
    <div class="example-container" v-else>
      <div>一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，如果想要改变 prop 的 key 名称和事件名称，
        可以使用 model 选项设置:</div>
      <div>
        <div class="sub-section">
          <div class="bold">text 元素</div>
          <div class="item-wrap">
            <!-- 等价：<v-model-component :checked="componentVal" @change="componentVal = $event" /> -->
            <v-model-component v-model="componentVal" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import * as T from './types.d';
import VModelComponent from './components/VModelComponent.vue';

let obj: T.Obj = {
  inputVal: '123',
  selectVal: '',
  radioVal: '',
  checkboxVal2: [],
  get inputValue() {
    return this.inputVal;
  },
  set inputValue(val) {
    this.inputVal = val;
  },
  get selectValue() {
    return this.selectVal;
  },
  set selectValue(val) {
    this.selectVal = val;
  },
  get radioValue() {
    return this.radioVal;
  },
  set radioValue(val) {
    this.radioVal = val;
  },
  get checkboxValue2() {
    return this.checkboxVal2;
  },
  set checkboxValue2(val) {
    this.checkboxVal2 = val;
  }
}

export default Vue.extend({
  name: 'VModel',
  components: {
    VModelComponent
  },
  data(): T.VModelData {
    return {
      type: 1,
      inputValue1: 'hello',
      inputValue2: 'hello',
      selectValue: '',
      selectValue2: '',
      radioValue1: '',
      radioValue2: '',
      checkboxValue: false,
      checkboxValue1: [],
      checkboxValue2: [],

      componentVal: false
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        //or: const input = <HTMLInputElement>document.getElementById('myInput');
        let input = document.getElementById('myInput') as HTMLInputElement;
        let el = this.$refs.inputDisplay as Element;
        input && (input.value = obj.inputValue);
        el.innerHTML = obj.inputValue;
      });
    },
    onInput(e: Event) {
      obj.inputValue = e && (e.target as HTMLInputElement).value;
      console.log(obj);
      let el = this.$refs.inputDisplay as Element;
      el.innerHTML = obj.inputValue;
    },
    onChange(e: Event) {
      obj.selectValue = e && (e.target as HTMLSelectElement).value;
      let el = this.$refs.selectDisplay as Element;
      el.innerHTML = obj.selectValue;
    },
    onRadioChange(e: Event) {
      obj.radioValue = e && (e.target as HTMLInputElement).value;
      let el = this.$refs.radioDisplay as Element;
      el.innerHTML = obj.radioValue;
    },
    onCheckboxChange(e: Event) {
      const checked = e && (e.target as HTMLInputElement).checked;
      const value = e && (e.target as HTMLInputElement).value;
      if(checked) {
        this.checkboxValue2.push(value);
      } else {
        this.checkboxValue2.splice(this.checkboxValue2.findIndex((item: string) => item === value), 1);
      }
    },
    onCheckboxChange2(e: Event) {
      const checked = e && (e.target as HTMLInputElement).checked;
      const value = e && (e.target as HTMLInputElement).value;
      if(checked) {
        obj.checkboxValue2.push(value);
      } else {
        obj.checkboxValue2.splice(obj.checkboxValue2.findIndex((item: string) => item === value), 1);
      }
      let el = this.$refs.checkboxDisplay as Element;
      el.innerHTML = `[${obj.checkboxValue2.toString()}]`;
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