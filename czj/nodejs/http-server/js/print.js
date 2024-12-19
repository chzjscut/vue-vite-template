import { msg } from './utils.js';

function polling(callback, seconds) {
  let timer;
  function run() {
    callback();
    timer = setTimeout(run, seconds);
  }

  timer = setTimeout(run, seconds);
  return {
    cancel: function() {
      clearTimeout(timer);
    }
  }
}

export function counterComponent() {
  let count = 0;
  const div = document.createElement('div');
  div.innerHTML = `计时：${count++}s`;

  const intervalId = polling(function() {
    div.innerHTML = `计时：${count++}s`;
  }, 1000);

  return div;
}

export default function printMe() {
  console.log(msg);
}