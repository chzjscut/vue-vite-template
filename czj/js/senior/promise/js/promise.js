//手写一个promise
// new Promise((resolve, reject) => {
//   resolve(1)
// })

/**
 * 静态方法：
 *  Promise.all()
 *  Promise.allSettled()
 *  Promise.any()
 *  Promise.race()
 *  Promise.resolve()
 *  Promise.reject()
 * 
 * 实例方法
 *  Promise.prototype.catch()
 *  Promise.prototype.finally()
 *  Promise.prototype.then()
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  constructor(fn) {
    this.PromiseState = PENDING;
    this.PromiseResult = undefined;
    //存储then中订阅的onFulfilled函数和onRejected函数
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    //执行发布
    const resolve = (result) => {
      //console.log(this, result, this.PromiseState)
      if(this.PromiseState === PENDING) {
        this.PromiseState = FULFILLED;
        this.PromiseResult = result;
        //console.log(this.onFulfilledCallbacks)
        //发布后通知所有的订阅者
        this.onFulfilledCallbacks.forEach(cb => cb(this.PromiseResult));
      }
    }
    const reject = (result) => {
      if(this.PromiseState === PENDING) {
        this.PromiseState = REJECTED;
        this.PromiseResult = result;

        this.onRejectedCallbacks.forEach(cb => cb(this.PromiseResult));
      }
    }

    try {
      fn(resolve, reject);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  }
  

  static resolve() {

  }
  static reject() {

  }

  then(onFulfilled, onRejected) {
    //console.log(this.PromiseState)
    //onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    //onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

    const promise2 = new Promise((resolve, reject) => {
      if(this.PromiseState === FULFILLED) {
        setTimeout(() => {
          try{
            if(typeof onFulfilled !== 'function') {
              resolve(this.PromiseResult);
            } else {
              const x = onFulfilled(this.PromiseResult);
              //resolve(x);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch(e) {
            reject(e);
          }
        })
      }
      if(this.PromiseState === REJECTED) {
        setTimeout(() => {
          try {
            if(typeof onRejected !== 'function') {
              reject(this.PromiseResult);
            } else {
              const x = onRejected(this.PromiseResult);
              //resolve(x);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch(e) {
            reject(e);
          }
        })
      }
      /**
       * 概念1：promise是异步编程的一种解决方案。在执行异步操作时通过resolve(或reject)返回异步结果，
       *        然后再执行then中的onFulfilled(或onRejected)回调。
       * 问题：但在promise实际使用中，在执行异步操作(如setTimeout)之前就已经执行了then方法（浏览器Event Loop），然后才会执行异步中的
       *      resolve(或reject)。如果按照上面的概念1流程，此时需要再去执行then中的回调(但是then在异步代码之前就已调用)，这一步要如何
       *      实现呢？
       * 方案：通过 发布-订阅模式 解决上面的问题：因为then中的回调(onFulfilled/onRejected)依赖resolve(或reject)的执行，所以，
       *      onFulfilled/onRejected相当于订阅者，订阅resolve/reject的执行；resolve/reject相当于发布者；Promise 提供事件通道作用，
       *      存储订阅的onFulfilled/onRejected；当发布者(resolve/reject)触发时，通过事件通道通知对应的订阅者(onFulfilled/onRejected)。
       */
      if(this.PromiseState === PENDING) {
        //还未执行resolve(或reject)，所以需要先订阅
        //this.onFulfilledCallbacks.push(onFulfilled)
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if(typeof onFulfilled !== 'function') {
                resolve(this.PromiseResult);
              } else {
                const x = onFulfilled(this.PromiseResult);
                //resolve(x);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          })
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if(typeof onRejected !== 'function') {
                reject(this.PromiseResult);
              } else {
                const x = onRejected(this.PromiseResult);
                //resolve(x);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          })
        });
      }
    });

    return promise2;
  }
}

/**
 * @param 
 */
function resolvePromise(promise2, x, resolve, reject) {
  if(x === promise2) {
    throw new TypeError('Chaining cycle detected for promise #<Promise>');
  }
  
  if(x instanceof Promise) {
    x.then(y => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
  } else if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      var then = x.then;
    } catch(e) {
      reject(e);
    }

    if(typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          y => {
            if(called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if(called) return;
            called = true;
            reject(r);
          }
        )
      } catch(e) {
        if(called) return;
        //called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

//以下为供测试代码
Promise.deferred = function() {
  let result = {};
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}

module.exports = Promise;