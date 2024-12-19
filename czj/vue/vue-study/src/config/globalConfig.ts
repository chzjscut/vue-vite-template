import Vue, {  VueConstructor } from 'vue';

// globalConfig: Vue.VueConstructor['config']
const globalConfig = {
  errorHandler(err: Error, vm: Vue, info: string) {
    console.error(11, err, vm, info);
  },
  ignoredElements: [
    /^dt-/
  ],
  keyCodes: {
    up: [38, 87]
  },
  performance: true,
  productionTip: false
}

export default globalConfig;