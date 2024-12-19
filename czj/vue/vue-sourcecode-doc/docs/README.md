---
lang: zh-CN
---

### Badge <Badge text="beta" type="warning"/> <Badge text="默认主题"/>
```html
<div id="counter">
  Counter: {{ counter }}
</div>
```
```js
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')
```