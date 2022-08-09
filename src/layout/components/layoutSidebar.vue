<template>
  <LayoutSider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo" />
    <Menu
      theme="dark"
      mode="inline"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @click="handleMenuSelect"
    >
      <template v-for="item in routes" :key="item.path">
        <SidebarMenuItem :item="item" currentFullPath="" />
      </template>
    </Menu>
  </LayoutSider>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, onBeforeMount, onMounted, computed } from 'vue';
  import { LayoutSider, Menu } from 'ant-design-vue';
  import { useRouter, useRoute } from 'vue-router';
  import SidebarMenuItem from './sidebarMenuItem.vue';
  import { asyncRoutes } from '../../router';
  import { useStore } from 'vuex';

  export default defineComponent({
    name: 'Sidebar',
    components: {
      LayoutSider,
      Menu,
      SidebarMenuItem,
    },
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();
      const { currentRoute } = router;
      const menuState = reactive({
        openKeys: [],
        selectedKeys: []
      });

      const handleMenuSelect = ({ item, key, keyPath  }) => {
        // console.log(item, key, keyPath )
        // console.log(route.path)
        // const toPath = keyPath.reduce((total, currentVal, index, arr) =>
        //   total + (index !== 0 ? `/${currentVal}` : currentVal), '');

        // console.log(toPath)
        if(route.path === key) return;
        router.push(key);
      }

      const menuInit = () => {
        //console.log(currentRoute.value)
        const reg = /([\w-]+)/gi;
        let openKeys = route.path.match(reg) || [];
        openKeys.splice(-1, 1)
        openKeys[0] && (openKeys[0] = `/${openKeys[0]}`);
        //console.log(openKeys)
        //const selectedKey = [].concat(currentRoute.value.meta?.currentActiveMenu || openKeys.splice(-1, 1));
        //console.log(openKeys, selectedKey)
        //const selectedKey = [route.path];
        //menuState.openKeys = openKeys;
        //menuState.selectedKeys = selectedKey;
        
        menuState.openKeys = openKeys;
        menuState.selectedKeys = [].concat(currentRoute.value.meta?.currentActiveMenu || currentRoute.value.fullPath);
      }

      onBeforeMount(() => {
        menuInit();
      });
      // onMounted(() => {
      //   console.log(route.path);
      // })
      const collapsed = computed(() => store.state.app.sidebar.collapsed);

      return {
        routes: asyncRoutes,
        collapsed,
        ...toRefs(menuState),

        handleMenuSelect
      }
    }
  });
</script>