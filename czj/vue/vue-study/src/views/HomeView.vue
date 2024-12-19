<template>
  <div class="home">
    <!-- 在全局配置中通过keyCodes设置了按键的别名 up: [38, 87]，当按W或向上键时，触发onClick -->
    <input @keyup.up="onClick" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    
  },
  methods: {
    onClick(e: any) {
      console.log(e)
    }
  }
});
</script>
