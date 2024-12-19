<template>
  <div>
    <div class="page-title">数据</div>
    <test-button>测试按钮</test-button>
    <!-- 
      *parent
      *mixins
      *extends
      provide/inject
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
    <section-module :title="`选项/组合: ${currentOption}`">
      <template v-if="currentOption === 'provide/inject'">
        <provide-inject />
      </template>
    </section-module>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Tag from '@/components/Tag.vue';
import ProvideInject from './components/provide-inject/index.vue';
import { Data } from './types.d';

export default Vue.extend({
  name: 'OptionsCombination',
  components: {
    Tag,
    ProvideInject,
  },
  data(): Data {
    return {
      optionsData: ['parent', 'mixins', 'extends', 'provide/inject'],
      currentOption: 'provide/inject',
    }
  },
  methods: {
    onSelect(value: string) {
      this.currentOption = value;
    },
  }
});
</script>