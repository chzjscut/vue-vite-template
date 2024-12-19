import _ from 'lodash';
import printMe, { counterComponent } from './print.js';
import '../styles/index.css';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'click me';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

// let counterEl = counterComponent();
// document.body.appendChild(counterEl);
let element = component();
document.body.appendChild(element);

//hmr
//if(module.hot) {
  //live reloading(刷新整个页面)
  //module.hot.accept();
  // module.hot.dispose(() => {
  //   window.location.reload();
  // });

  // module.hot.accept('./print.js', function() {
  //   console.log('Accepting the updated printMe module!');
  //   //printMe();
  //   // document.body.removeChild(counterEl);
  //   // counterEl = counterComponent();
  //   // document.body.appendChild(counterEl);
  //   document.body.removeChild(element);
  //   element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
  //   document.body.appendChild(element);
  // })

  //let oldId = new Date().getTime();
  //module.hot.accept('../styles/index.css', function() {
    //const newContent = fs.readFileSync('../styles/index.css', 'utf8');
    // 创建一个新的 style 标签
    // var style = document.createElement('style');
    // let newId = new Date().getTime();
    // style.setAttribute('data-href', newId);
    // style.type = 'text/css';
    // //style.innerHTML = newContent; // 将新样式的内容设置到 style 标签中

    // // 将旧的 style 标签移除
    // var oldStyle = document.querySelector(`style[data-href="${oldId}"]`);
    // if (oldStyle) {
    //   document.head.removeChild(oldStyle);
    // }
    // oldId = newId;
    // // 将新的 style 标签添加到 head 中
    // document.head.appendChild(style);
  //});
//}