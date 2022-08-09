<template>
  <MenuItem
    :key="key"
    v-if="(!item.children || item.children.length === 0 || item?.meta?.hideChildrenInMenu) && !item?.meta?.hideMenu"
  >
    <Icon :icon="item.meta?.icon" />
    <span>{{item.meta?.title}}</span>
  </MenuItem>

  <SubMenu
    :key="item.path"
    v-if="item.children && item.children.length > 0 && !item?.meta?.hideMenu && !item?.meta?.hideChildrenInMenu"
  >
    <template #icon><user-outlined /></template>
    <template #title>{{item.meta?.title}}</template>
    <template v-for="subItem in item.children" :key="subItem.path">
      <SidebarMenuItem :item="subItem" :currentFullPath="item.path[0] === '/' ? item.path : `${currentFullPath}/${item.path}`" />
    </template>
  </SubMenu>
</template>

<script lang="ts">
  import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
  import { Menu } from 'ant-design-vue';
  import {
    UserOutlined,
  } from '@ant-design/icons-vue';
  import { useRouter, useRoute } from 'vue-router';
  import Icon from '/@/components/Icon.vue';

  export default defineComponent({
    name: 'SidebarMenuItem',
    components: {
      MenuItem: Menu.Item,
      SubMenu: Menu.SubMenu,
      UserOutlined,
      Icon,
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      currentFullPath: String
    },
    setup(props) {
      const { item, currentFullPath } = props;
      const icon = computed(() => {
        var str = 'UserOutlined';
      })

      const key = computed(() => {
        // 优先级
        //最高优先级：手动设置active菜单项
        if(item.meta?.currentActiveMenu) {
          return item.meta?.currentActiveMenu;
        }
        //如果设置隐藏子菜单(通常只会出现在只有一个子菜单的情况)，key取重定向的path
        if(item.meta?.hideChildrenInMenu && item.redirect) {
          return item.redirect;
        }
        return (item.path[0] === '/' ? item.path : `${currentFullPath}/${item.path}`)
      })
      return {
        key
      }
    }
  });
</script>