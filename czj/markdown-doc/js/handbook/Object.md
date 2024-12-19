### 知识点汇总

+ Object.create(proto，[propertiesObject])
--proto 
&emsp; 新创建对象的原型对象
--propertiesObject
&emsp; 可选。需要传入一个对象，该对象的属性类型参照Object.defineProperties()的第二个参数。如果该参数被指定且不为 undefined，该传入对象的自有可枚举属性(即其自身定义的属性，而不是其原型链上的枚举属性)将为新创建的对象添加指定的属性值和对应的属性描述符

+ 继承
+ Object.defineProperty
+ getters/setters
+ delete : 一些注意点
+ 