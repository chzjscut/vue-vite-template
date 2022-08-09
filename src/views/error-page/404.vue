<template>
  <Result
    status="404"
    title="404"
    sub-title="抱歉，您访问的页面不存在。"
    class="error-wrap"
  >
    <template #extra>
      <router-link to="/">
        <Button type="primary">回到首页</Button>
      </router-link>
    </template>
  </Result>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Result, Button } from 'ant-design-vue';

  export default defineComponent({
    name: '404',
    components: { Result, Button },
  })
</script>
<style lang="less" scoped>
  .error-wrap {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
  }
</style>