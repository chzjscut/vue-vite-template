import {createRouter, createWebHashHistory} from 'vue-router';
import Layout from '../layout/index.vue';

export const RootRoute = {
  path: '/',
  redirect: '/dashboard',
}
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/404',
    component: () => import('/@/views/error-page/404.vue'),
    hideMenu: true
  }
];

export const asyncRoutes: any[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: {
      title: '仪表盘',
      icon: 'ant-design:dashboard-outlined',
      authCode: 'dashboard',
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'index',
        component: () => import('../views/dashboard/index.vue'),
        meta: {
          title: '仪表盘2',
          icon: 'ant-design:dashboard-outlined',
          authCode: 'dashboard',
          //hideMenu: true
        },
      }
    ]
  },
  {
    path: '/setup',
    component: Layout,
    redirect: '/setup/person',
    meta: {
      title: '设置',
      icon: 'ant-design:setting-outlined',
      authCode: 'setup',
    },
    children: [
      {
        path: 'person',
        component: () => import('../components/ContentWrapper.vue'),
        redirect: '/setup/person/role',
        meta: {
          title: '人员设置',
          icon: 'ant-design:user-outlined',
          authCode: 'setup-role',
        },
        children: [
          {
            path: 'role',
            component: () => import('../views/setup/role.vue'),
            meta: {
              title: '角色设置',
              icon: 'ant-design:trademark-outlined',
              authCode: 'setup-role',
            },
          },
          {
            path: 'role-edit',
            component: () => import('../views/setup/roleEdit.vue'),
            meta: {
              title: '角色编辑',
              icon: '',
              authCode: 'setup-role-edit',
              currentActiveMenu: '/setup/person/role',
              hideMenu: true
            },
          },
          {
            path: 'user',
            component: () => import('../views/setup/user.vue'),
            meta: {
              title: '用户设置',
              icon: 'ant-design:usergroup-add-outlined',
              authCode: 'setup-user',
            },
          }
        ]
      },
      {
        path: 'menu',
        component: () => import('../views/setup/menu.vue'),
        meta: {
          title: '菜单设置',
          icon: 'ant-design:menu-outlined',
          authCode: 'setup-menu',
          //hideMenu: true
        },
      }
    ]
  }
];
export const routes: any[] = [
  RootRoute,
  ...constantRoutes,
  ...asyncRoutes,
  { path: '/:path(.*)*', redirect: '/404', hideMenu: true }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;