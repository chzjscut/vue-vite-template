import { VueConstructor } from 'vue';
import Test from './test.vue';

const install = function(Vue: VueConstructor, opts = {}) {
  Vue.component(Test.name, Test);
}

export default {
  install
}