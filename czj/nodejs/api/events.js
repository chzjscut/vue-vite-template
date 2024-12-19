const events = require('events');

const eventEmitter = new events.EventEmitter();

const connectHandler = () => {
  console.log('connect success!');
}

const readyToReceiveData = () => {
  console.log('ready to receive data!');
}

const dataReceivedHandler = () => {
  console.log('data received!');
}

// 内置事件，只要为 eventEmitter 实例添加新的事件监听器都会触发 newListener 事件
eventEmitter.on('newListener', (event, listener) => {
  console.log(event, listener)
});

eventEmitter.on('connection', connectHandler);
eventEmitter.on('connection', readyToReceiveData);

// eventEmitter.on('data_received', dataReceivedHandler);
eventEmitter.once('data_received', dataReceivedHandler);

console.log('--start--');

// eventEmitter.setMaxListeners(1);

// eventEmitter.addListener('connection', connectHandler);
eventEmitter.emit('connection');
eventEmitter.emit('data_received');
eventEmitter.emit('data_received');

console.log(eventEmitter.listenerCount('connection'));
console.log(eventEmitter.listeners('connection'));
// eventEmitter.removeListener('data_received', dataReceivedHandler);
// eventEmitter.emit('data_received');

console.log('--end--');