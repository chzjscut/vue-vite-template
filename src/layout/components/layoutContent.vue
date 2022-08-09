<template>
  <layout-content>
    <router-view></router-view>
  </layout-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { LayoutContent } from 'ant-design-vue';

  export default defineComponent({
    name: 'Content',
    components: {
      LayoutContent
    }
  });
</script>