<template>
  <div>
    <section-module title="列表更新（diff算法）">
      <div>Vue的“就地更新”策略：尽可能复用现有的DOM元素，提升性能。</div>
      <div>缺陷：元素复用时，会保留子组件状态和临时DOM状态（如表单输入），如果删除某条包含临时DOM状态数据时，会导致临时状态未被删除。</div>
      <div>例如：操作下面的列表，在input中输入内容，再删除该行，发现input内的值仍然存在。</div>
      <div>解决办法：给每一项加唯一的key标识</div>
      <div class="list-wrap">
        <!-- 用索引设置key仍然会存在上面的缺陷问题，因为如果是插入一条数据，该条数据及以后的数据的key值都会发生变化 -->
        <el-row
          type="flex"
          align="middle"
          justify="space-between"
          class="list-item"
          v-for="(item, index) in listData"
          :key="index"
        >
          <el-col :span="12">{{item}} <input type="text"></el-col>
          <el-col :span="6" class="list-item-right">
            <el-button size="mini" @click="onMove(index - 1, index)">上移</el-button>
            <el-button size="mini" @click="onMove(index, index + 1)">下移</el-button>
            <el-button size="mini" @click="onRemove(index)">删除</el-button>
          </el-col>
        </el-row>
        <!-- <div v-for="item in listData" :key="item">{{item}} <input type="text"></div> -->
      </div>
      <div>
        <el-button @click="onInsertBefore">unshift</el-button>
      </div>
    </section-module>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Data } from './types.d';

const letters = 'abcd';

export default Vue.extend({
  name: 'ListUpdateStrategy',
  data(): Data {
    return {
      listData: [],
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.listData = letters.split('');
    },
    onInsertBefore() {
      const date = new Date();
      this.listData.unshift(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    },
    onMove(index1: number, index2: number) {
      if(index2 === 0 || index1 === this.listData.length - 1) return;
      //非响应式
      /* [this.listData[index - 1], this.listData[index]] = [this.listData[index], this.listData[index - 1]]; */

      //只能用于连续两个位置的对调
      /* this.listData.splice(index - 1, 2, this.listData[index], this.listData[index - 1]); */

      //通用方法：任意两个位置互换
      this.listData.splice(index1, 1, ...this.listData.splice(index2, 1, this.listData[index1]));
      //console.log(this.listData)
    },
    onRemove(index: number) {
      this.listData.splice(index, 1);
    }
  }
});
</script>
<style lang="scss" scoped>
  .list-wrap {
    max-height: 500px;
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 20px;
    border: 1px solid #ccc;
    .list-item {
      padding: 5px 0;
      line-height: 32px;
      border-top: 1px solid #ccc;
      cursor: pointer;
      &:hover {
        background-color: #efefef;
      }
      .list-item-right {
        text-align: right;
      }
    }
  }
</style>