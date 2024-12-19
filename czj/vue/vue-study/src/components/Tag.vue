<template>
  <span
    :class="['dt-tag', { active: activeTag === tag }]"
    @click="$emit('select', tag);"
  >{{tag}}</span>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    tag: String,
    activeTag: String
  },
});

</script>