## React合成事件和JS源生事件的执行顺序总结

### React 合成事件

1. `合成事件`中事件执行时机是 `冒泡阶段`
2. `合成事件`间的冒泡可以通过 `stopPropagation`来阻止冒泡
3. `合成事件`和最外层的document间的冒泡可以通过 `stopImmediateStopPropagation`来阻止




### JS 源生事件

1. `document`上执行 `stopImmediatePropagation`会把合成事件以及源生事件都禁止掉。
2. 可以通过 `addEventListener`的第三个参数来控制事件在 `捕获阶段(true)`还是`冒泡阶段(false)`执行
3. `stopPropagation`可以分别在`捕获阶段`和 `冒泡阶段`来阻止捕获或者冒泡的行为