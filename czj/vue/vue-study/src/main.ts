import Vue from "vue";
import globalConfig from "./config/globalConfig";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

import SectionModule from '@/components/SectionModule.vue';
import MyPlugin from '@/views/plugins';

//Vue.config.productionTip = false;
Object.assign(Vue.config, globalConfig)
Vue.use(MyPlugin);
Vue.use(ElementUI);
Vue.component('section-module', SectionModule);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
