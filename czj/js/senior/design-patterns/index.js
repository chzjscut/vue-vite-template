//常见设计模式

//1、观察者模式
/**
 * 定义：
 * 组成: 观察者 和 被观察者
 * 流程：被观察者可以添加多个观察者（也可以移除观察者），当被观察者发生变化时通知所有的观察者。
 * 重点：被观察者
 * 优点：角色明确
 * 缺点：紧耦合
 */

// 被观察者
class Subject {
  constructor() {
    this.observerList = [];
  }

  addObserver(observer) {
    this.observerList.push(observer);
  }

  removeObserver(observer) {
    const index = this.observerList.findIndex(o => o.name === observer.name);
    if(index > -1) {
      this.observerList.splice(index, 1);
      console.log(`-------remove ${observer.name}--------`)
    }
  }

  notify(message) {
    this.observerList.forEach(observer => {
      observer.update(message);
    })
  }
}

// 观察者（Observer）
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(message) {
    console.log(`${this.name}: ${message}`);
  }
}

//测试
const subject = new Subject();
const ob1 = new Observer('aaa');
const ob2 = new Observer('bbb');
subject.addObserver(ob1);
subject.addObserver(ob2);
subject.notify('来消息了');
subject.removeObserver(ob2);
subject.notify('来消息了');
console.log('/////////////////////////////////////////////////////////////////////////////');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//2、发布-订阅模式
/**
 * 定义：
 * 组成：发布者、发布订阅中心、订阅者
 * 流程：订阅者通过 发布订阅中心 订阅（某个）发布者以获取更新消息，当该发布者有更新时在 发布订阅中心 发布相应的更新消息，发布订阅中心 会
 *       自动将该消息通知到对应的订阅者。
 * 实现：在 发布订阅中心 维护所有的消息列表（不同的消息通过类型区分）；
 *       订阅者需要手动订阅对应类型的消息，同时将自己在收到消息通知后需要做的操作（callback）告知 发布订阅中心（发布订阅中心 在下发通知时
 *       会执行改操作）；
 *       发布者在 发布订阅中心 发布相应类型的消息更新；
 * 重点：发布订阅中心
 * 优点：松散耦合（发布者和订阅者之间不需要知道彼此），灵活度高，通常应用在异步编程中
 * 缺点：当事件类型变多时，会增加维护成本
 */
class PubSub {
  constructor() {
    this.subscriberListeners = {};
    this.publisherMessages = {};
  }

  subscribe(type, cb) {
    if(!this.subscriberListeners[type]) {
      this.subscriberListeners[type] = [];
    }
    this.subscriberListeners[type].push(cb);
  }

  publish(type, content) {
    if(!this.publisherMessages[type]) {
      this.publisherMessages[type] = [];
    }
    this.publisherMessages[type].push(content);
  }

  //移除某个消息类型下的某个订阅(事件)
  unsubscribe(subscriber, type, cb) {
    if(this.subscriberListeners[type]) {
      const index = this.subscriberListeners[type].findIndex(item => item === cb);
      if(index > -1) {
        this.subscriberListeners[type].splice(index, 1);
        console.log(`--------------${subscriber.name} removed ${type}下的订阅:${cb.name}-------------`);
      }
    }
    if(this.subscriberListeners[type].length === 0) {
      delete this.subscriberListeners[type];
    }
  }

  //移除某个消息类型下的所有订阅(事件)
  unsubscribeAll(type) {
    if(this.subscriberListeners[type]) {
      delete this.subscriberListeners[type];
    }
  }

  notify(type) {
    const messages = this.publisherMessages[type];
    const subscribers = this.subscriberListeners[type] || [];
    subscribers.forEach(cb => cb(messages));
  }
}

class Subscriber {
  constructor(name) {
    this.name = name;
  }

  subscribe(pubSub, type, cb) {
    pubSub.subscribe(type, cb);
  }

  // unsubscribe(pubSub, type, cb) {
  //   pubSub.unsubscribe(type, cb);
  // }
}

class Publisher {
  constructor(name) {
    this.name = name;
  }

  publish(pubSub, type, content) {
    pubSub.publish(type, content);
  }
}

//测试
const pubSub = new PubSub();
const subscriber_A_01 = new Subscriber('Subscriber_A_01');
const subscriber_A_02 = new Subscriber('Subscriber_A_02');
const subscriber_B_01 = new Subscriber('Subscriber_B_01');
const subscriber_B_02 = new Subscriber('Subscriber_B_02');
const publisherA = new Publisher('PublisherA');
const publisherB = new Publisher('PublisherB');

const cb = (subscriberName, cbName) => {
  const callback = (res) => {
    console.log(`${subscriberName} received sports message:` + res);
  };
  Object.defineProperty(callback, 'name', {
    value: cbName
  });
  return callback;
};
const cb1 = cb(subscriber_A_01.name, 'cb1');
const cb2 = cb(subscriber_A_02.name, 'cb2');
const cb3 = cb(subscriber_B_01.name, 'cb3');
const cb4 = cb(subscriber_B_02.name, 'cb4');
subscriber_A_01.subscribe(pubSub, 'sports', cb1);
subscriber_A_02.subscribe(pubSub, 'sports', cb2);
subscriber_B_01.subscribe(pubSub, 'music', cb3);
subscriber_B_02.subscribe(pubSub, 'music', cb4);
publisherA.publish(pubSub, 'sports', 'NBA is coming!');
publisherB.publish(pubSub, 'music', 'yesterday once more is very nice');
pubSub.notify('sports');
pubSub.notify('music');
pubSub.unsubscribe(subscriber_A_02, 'sports', cb2);
pubSub.notify('sports');
pubSub.notify('music');

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//通过上面的实现可以发现：发布者 和 订阅者 的操作都可以统一放在 发布订阅中心 去做，所以不需要再定义 Subscriber 和 Publisher:
class PubSub2 {
  constructor() {
    this.events = {};
  }

  subscribe(type, cb) {
    if(!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(cb);
  }

  publish(type, ...args) {
    if(this.events[type]) {
      this.events[type].forEach(cb => cb(...args));
    }
  }

  //移除某个事件类型下的一个订阅行为（cb）
  unsubscribe(type, cb) {
    if(this.events[type]) {
      const index = this.events[type].findIndex(item => item === cb);
      if(index > -1) {
        this.events[type].splice(index, 1);
        console.log(`-------${type}类型下的${cb.name}已被移除--------`);
      }
      if(this.events[type].length === 0) {
        delete this.events[type];
      }
    }
  }

  //移除某个事件类型下的所有订阅行为
  unsubscribeAll(type) {
    if(this.events[type]) {
      delete this.events[type];
    }
  }
}

//测试
let pubSub2 = new PubSub2();
const callback1 = (res) => {
  console.log('数学学科消息：' + res);
};
const callback2 = (res) => {
  console.log('数学学科来消息通知了：' + res);
};
const callback3 = (res) => {
  console.log('英语学科消息：' + res);
};
const callback4 = (res) => {
  console.log('英语学科来消息通知了：' + res);
};
pubSub2.subscribe('maths', callback1);
pubSub2.subscribe('maths', callback2);
pubSub2.subscribe('english', callback3);
pubSub2.subscribe('english', callback4);

pubSub2.publish('maths', '数学竞赛报名开始了。');
pubSub2.publish('maths', '期末考试数学成绩出来了。');
pubSub2.publish('english', '英语演讲比赛报名开始了。');
pubSub2.publish('english', '期末考试英语成绩出来了。');

pubSub2.unsubscribe('maths', callback1);

pubSub2.publish('maths', '数学竞赛报名开始了。');
pubSub2.publish('maths', '期末考试数学成绩出来了。');
pubSub2.publish('english', '英语演讲比赛报名开始了。');
pubSub2.publish('english', '期末考试英语成绩出来了。');
/////////////////////////////////////////////////////////////////////////////////////////////////////////
