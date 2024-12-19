<template>
  <button>
    <slot></slot>
  </button>
</template>
<script lang="ts">
import Vue from 'vue';

export default {
  name: 'testButton'
};
// export default Vue.extend({
//   name: 'testButton'
// })
</script>