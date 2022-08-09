<template>
  <Layout class="dota-layout">
    <LayoutSidebar />
    <Layout>
      <LayoutHeader />
      <LayoutContent />
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  import LayoutSidebar from './components/layoutSidebar.vue';
  import LayoutHeader from './components/layoutHeader.vue';
  import LayoutContent from './components/layoutContent.vue';

  export default defineComponent({
    name: 'LayoutIndex',
    components: {
      Layout,
      LayoutContent,
      LayoutSidebar,
      LayoutHeader
    }
  });
</script>
<style>
  .dota-layout {
    height: 100%;
  }
</style>