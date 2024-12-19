interface Obj {
  [key: string]: any;
}

function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

const defineReactive = function(obj: Object, key: string, val: any) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      if(Dep.target) {
        dep.addSub(Dep.target); //添加订阅者
      }
      return val;
    },
    set: function reactiveSetter(newVal) {
      console.log(dep);
      if(val === newVal) return;
      val = newVal;
      dep.notify(); //通知所有订阅者
    }
  });
}

// 观察者（Observer）
class Observer {
  data: Obj;

  constructor(data: Obj) {
    this.data = data;
    def(data, '__ob__', this);
    this.walk(data);
  }

  walk(data: Obj) {
    const keys = Object.keys(data);
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      defineReactive(data, key, data[key]);
    }
  }
}

// 订阅者（Dep）
class Dep {
  static target?: Watcher;
  subs: Array<Watcher>;

  constructor() {
    this.subs = [];
  }

  addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

// 观察者（Watcher）
class Watcher {
  vm: any;
  expOrFn: string;
  cb: Function;
  value: any;

  constructor(vm: any, expOrFn: string, cb: Function) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;
    // 初次执行会将当前Watcher设为Dep.target
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.vm.data[this.expOrFn];
    Dep.target = null;
    return value;
  }

  update() {
    console.log('---data changed---');
    const newValue = this.vm.data[this.expOrFn];
    if(newValue !== this.value) {
      this.value = newValue;
      this.cb.call(this.vm, newValue);
    }
  }
}


// test
const vm = {
  data: {
    message: 'Hello Vue!',
    list: [1, 2, 3]
  }
}

new Observer(vm.data);

// 创建Watcher
new Watcher(vm, 'message', function(newVal: any) {
  console.log('Data changed:', newVal);
});

//测试数据变化
//vm.data.message = 'Hello World!';

/**
 * 在这个例子中，Observer类用来监视数据模型，当数据被访问时，它会通过Object.defineProperty将属性转换成响应式的，
 * 并在属性被访问时收集依赖。Dep类作为发布者，管理所有订阅者（Watcher），当数据变化时，会通知所有订阅者进行更新。
 * Watcher类作为订阅者，在其构造函数中执行了依赖的收集，并在其get函数中被设置为Dep.target以开始收集依赖，
 * 并在update函数中执行回调函数进行视图更新。 
 */
