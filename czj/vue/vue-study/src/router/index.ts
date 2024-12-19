import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/api/attribute",
    name: "attribute",
    component: () => import("@/views/api/attribute/index.vue"), //特殊attribute
  },
  {
    path: "/api/instruction",
    name: "instruction",
    component: () => import("@/views/api/instruction/index.vue"), //指令
  },
  {
    path: "/api/options/data",
    name: "optionsData",
    component: () => import("@/views/api/options/data/index.vue"), // 选项/数据
  },
  {
    path: "/api/options/combination",
    name: "optionsCombination",
    component: () => import("@/views/api/options/combination/index.vue"), // 选项/组合
  },
  {
    path: "/component-example/index",
    name: "componentExample",
    component: () => import("@/views/component-example/index.vue"), // 组件
  },

  //
  {
    path: "/interview-points/listUpdateStrategy",
    name: "listUpdateStrategy",
    component: () => import("@/views/interview-points/listUpdateStrategy.vue"), //列表更新(diff算法)
  },
  {
    path: "/interview-points/eventHandle",
    name: "eventHandle",
    component: () => import("@/views/interview-points/eventHandle.vue"), //事件处理
  },
];

const router = new VueRouter({
  routes,
});

export default router;
