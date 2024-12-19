<template>
  <div>
    <!-- 
      v-model
      v-on
      *v-bind
      *v-slot
      *v-cloak
      *v-pre
    -->
    <div class="page-title">指令</div>
    <div class="tags">
      <tag
        v-for="tag in instructions"
        :key="tag"
        :tag="tag"
        :activeTag="currentInstruction"
        @select="onSelect(tag)"
      />
    </div>
    <section-module :title="`instruction: ${currentInstruction}`">
      <v-model v-if="currentInstruction === 'v-model'" />
      <v-on v-if="currentInstruction === 'v-on'" />
      <v-bind v-if="currentInstruction === 'v-bind'" />
    </section-module>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import * as T from './types.d';
import Tag from '@/components/Tag.vue';
import VModel from './v-model.vue';
import VOn from './v-on.vue';
import VBind from './v-bind.vue';

export default Vue.extend({
  name: 'InstructionIndex',
  components: {
    Tag,
    VModel,
    VOn,
    VBind
  },
  data(): T.Data {
    return {
      instructions: ['v-model', 'v-on', 'v-bind', 'v-slot', 'v-cloak', 'v-pre'],
      currentInstruction: 'v-model',
    }
  },
  
  methods: {
    onSelect(value: string) {
      this.currentInstruction = value;
    },
  }
});
</script>
<style lang="scss" scoped>
</style>