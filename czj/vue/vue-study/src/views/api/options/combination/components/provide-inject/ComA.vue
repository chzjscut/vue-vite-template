<template>
  <div>
    <div>{{foo}}</div>
    <div>id: {{obj.id}}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  //inject: ['foo', 'obj'],
  inject: {
    foo: 'foo',
    obj: {
      //from: 'obj',
      default: () => ({ id: 0 })
    }
  },
  data() {
    return {
      
    }
  },
  created() {
    // @ts-ignore
    console.log(1, this.foo)
  }
});
</script>