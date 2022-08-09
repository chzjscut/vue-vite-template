<template>
  <layout-header :class="['dt-header', headerClass]" style="background: #fff">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="toggleCollapsed"
    />
    <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
  </layout-header>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { LayoutHeader } from 'ant-design-vue';
  import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons-vue';
  import { useStore } from 'vuex';

  export default defineComponent({
    name: 'Header',
    components: {
      LayoutHeader,
      MenuUnfoldOutlined,
      MenuFoldOutlined
    },
    props: {
      headerClass: {
        type: String,
        default: ''
      }
    },
    setup() {
      const store = useStore();
      const collapsed = computed(() => store.state.app.sidebar.collapsed);

      const toggleCollapsed = () => {
        store.commit('setSidebar', { collapsed: !collapsed.value });
      }

      return {
        collapsed,
        toggleCollapsed
      }
    }
  });
</script>
<style lang="less" scoped>
  .dt-header {
    height: 48px;
    line-height: 48px;
    padding-left: 10px;
  }
</style>