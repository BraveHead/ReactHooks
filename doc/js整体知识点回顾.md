1.  js的数据类型有哪些？以及区别

  基本数据类型(栈)：Number, String, null, undefind, Boolean, Symbol, BigInt.
  其中 Symbol 代表创建后是独一无二的类型，可以用来解决全局变量冲突的问题
  引用数据类型(堆)：Array, Object，Function。

  基本类型放在栈中，因为这些数据大小固定，频繁使用。 引用数据类型的指针放在栈中，该指针指向堆中该实体的起始地址。当解释器在寻找引用值的时候，会先检索在栈中的地址，然后再去堆中获取实际的实体。

2. 堆栈的区别？

  堆和栈的概念存在于数据结构中还有操作系统中。
  首先在数据结构中：栈中的数据是先进后出, 而堆中的数据则是按照优先级排放的，比如按照大小。
  在操作系统中，则有栈区和堆区的说法。
   - 栈区:一般是由编译器在运行的时候动态开辟和清除，比如可以用来存档参数，全局变量等。
   - 堆区则是由程序猿分配释放，若程序员不释放，可能就由垃圾回收机制来释放。

3. 内部[[class]]属性是什么？

   通过typeof 可以判断 object,string, number, bool, undefind等， 但是 array 和null 都会被判断成 obejct.  可以通过 Obejct.prototype.toString方法来获取对象的类型 返回 => [object, Object], [object, Array], [object, Number] 等。

   这里解释下 为啥可以用 Obejct.prototype.toString.call([1, 2]) => [object, Array], 而 [1, 2].toString() => '[1, 2]'.
   因为 数组是继承自对象，但是会在数组的方法中对 toString进行了改写。 而 call 只是为了让 [1, 2]可以指向 Object中的this, 从而可以判断出 [1, 2]的类型。

4. null 和 undefind 的区别

    - 首先 null  和 undefind 都是基本数据类型.
    - undefind一般是变量声明了，但是没有赋值，默认为 undefind, 而 null 则是 变量声明后主动赋值为 null 用来初始化或者释放内存。
    - typeof null 为 object， 而 typeof undefind 还是 undefind.
    - null == undefind 为 true, 而 null === undefind 为 false.

  注意事项: 因为 undefind 不是一个保留字，所以 可以定义局部的 undefind,比如下面代码：
  ```js
    let undefind = 'test';
    if(data === undefind) {
        // doing
    } else {

    }
  ```
  这个时候因为 undefind是自己定义的局部变量，所以代码就很不语义化以及和全局的冲突，那么可以当真的想判断 data === undefind的时候可以用 data === void 0 来替代。


5. js中原型和原型链？有什么特点？

- 函数对象的prototype 属性
    - 我们创建的每一个函数，都会生成prototype属性，这个属性是一个指针，这个指针指向一个对象，以后由这个函数创建的实例也都会有一个指针，这个指针我们无法获取到，但是在主流的浏览器中，实现了 __proto__ 这个属性可以获取到这个对象，当然也可以通过 Obejct.getPrototypeOf()方法来获取对象的原型。

- constructor 属性
    当函数创建的时候, 函数原型的对象上增加 constructor属性，默认情况下 constructor是一个指针，指向当前prototype所在的函数。如: Person.prototype.constructor === Person.

- 对象的 __proto__ 属性

    每个对象新创建出来的时候，都会在对象的内部有一个[[prototype]]的指针，这个指针我们无法在外部获取的到，但是主流浏览器其实实现了通过__proto__来获取实例的原型对象。也可以通过 Obejct.getPrototypeOf();

- isPrototypeOf 
   可以通过isPrototypeOf来判断 当前的实例是否在另一个对象的原型链上。 如: Persopn.prototype.isPrototypeOf(personInstance) => true


- Object.getPrototypeOf()
   
  Object.getPrototypeOf(personInstance) => 可以返回 Person.prototype的这个原型对象。

- 属性判断：

   如何判断当前的属性是在实例上的属性还是实例原型对象上的属性可以通过 hasOwnPrototy 方法。 如： personInstance.hasOwnPrototy('name') => 当 name 在 personInstance对象上则返回 true, 若不在或者 在 perosnInatance.prototype上则返回 false.

- for-in 循环

    可以返回当前对象以及对象原型上的所有可枚举的属性。

- Object.keys() 
 
    返回该实例上可枚举的属性。实例的原型对象上的可枚举无法返回。

- Object.getOwnPrototypeNames()

    返回该实例以及实例原型对象上的所有属性包括可枚举和不可枚举属性。


6. 怎么获取原型？
- Object.getPrototypeOf(p1)
- p1.constructor.prototype
- p1.__proto__  // 只在浏览器中可用

7. js中整数的安全范围是多少?
    -2^53-1 ~ 2^53 -1 
    在 ES6中 最大数为 Number.MAX_SAFE_INTEGER, 最小数为 Number.MIN_SAFE_INTEGER 

8. typeof NaN 返回啥？
    
    返回 Number
    NaN 是一个 '不是一个数字', 用于表述数字类型中的错误，即在数学计算后的结果, 不成功就返回 NaN
    值的注意的是 NaN === NaN => false， 是唯一一个非自反的

9. isNaN 和 Number.isNaN 函数的区别？
   
   isNaN 是判断传入的参数是否可转换成 Number, Number.isNuN 则是 判断传入的参数是否是 NaN

10. Array 构造函数只有一个参数值时的表现？
   
   当只传入如 Array(1) => 只会返回长度为1的空数组，数组不会有元素。 但是 Array(1, 2) => [1, 2]

11. parseInt() 和 Number()  区别？

- parseInt 会从其实位置开始解析,如若开始就遇到非number的元素那么直接返回 NaN, 开始为number,中间为非NaN如 parseInt('123qwe') => 123.
- Number() => Number('123') => 123; Number('123qwe') => NaN.

12. js中生成范围内随机数方法

- [0, 1)
```js
    Math.random();
```

- [n, m)

```js
    Math.random()*(m - n )+ n
```

- [n, m]

```js
    function random(n, m) {
        let result  = Math.random()*(m+1 - n) + n;
        while(result > m) {
            result = Math.random()*(m+1 - n) + n;
        };
        return result;
    }
```

- (n, m)

```js
    function random(n, m) {
        let result  = Math.random()*(m - n) + n;
        while(result  === n) {
            result = Math.random()*(m+1 - n) + n;
        };
        return result;
    }
```

- (n, m]

```js
    function random(n, m) {
        let result  = Math.random() * (m + 1 - n) + n -1;
        while(result <= n) {
            let result  = Math.random() * (m + 1 - n) + n -1;
        }
        return result;
    }
```

13. Ajax 是啥？ 封装一个Ajax函数？

    Ajax是客户端通过异步通信向服务器请求数据, 客户端拿到数据后，可直接渲染出内容，而不需要刷新页面的一种技术。

    以下为封装函数 [手写ajax函数](./ajax.js)

14. 手写一个 Promise?
    
    以下为封装函数 [手写Promise函数](./promise.js).

15. 手写一个 generator?

    以下未扎封装函数 [手写generator](./generator.js).

16. 什么是可迭代协议？什么是迭代器协议？

- 可迭代协议允许JavaScript对象定义或定制它们的迭代行为。例如在 一个 `for...of` 结构中，哪些值可以被遍历到。一些内置类型同时还是 `内置可迭代对象`，并且有默认的迭代行为，比如 `Array`和 `Map`,而其他类型则不是，如 `Object`。
  要成为一个可迭代的对象，必须要实现 `@@iterator`方法。这意味着对象必须有一个 `@@iterator`的key值。

- 迭代器协议定义了产生一系列值(无论是有限值还是无限值)的标准方式。当值为有限的时候，迭代完成后，则会返回一个默认的值。 只有实现了一个拥有 `next()` 方法，一个对象才能成为迭代器。

- [简单的迭代器Demo](./iterator.js)


17. 如何手写一个可以迭代的对象(object)?  // TODO 

```js

    let obj = {
        name: '123',
        age: 20,

        [Symbol.iterator]: function* () {
            let keys = Object.keys(obj);
            let index = 0;
            while(index < keys.length) {
                yield obj[keys[index++]];
            };
        }
    };

    // 可以通过 for...of 去判断当前对象是否是一个迭代器, 没有[Symbol.iterator]会报错
    for(let key of obj) {
        console.log('key:', key);
    }


```


18. 为什么 用箭头函数不能 new ? 能不能说下new的过程并手写一个new 函数？

```js
    function A() {
        console.log('A');
    };
    let a = new A();
```

- new 的执行过程：
    - 创建一个空的对象=> {};
    - 把A.prototype连接到新对象的a.__proto__上;
    - 执行A方法并把a对象绑定到 A的 this上, 
    - 获取A方法执行的结果，如果该函数没有返回对象或者方法，那么直接返回this, 否则返回对象或者方法。

- 为什么 箭头函数不能 new 呢？ 因为箭头函数压根就没有 prototype, 并且箭头函数没有this, 所以无法绑定，因为箭头函数的this是在执行的上下文中动态绑定的。

- 手写的一个 [new方法](./new.js)


19. 说下 this 的指向？ 箭头函数的this? 普通函数的 this? // TODO 

- [ES6箭头函数的this指向详解](https://zhuanlan.zhihu.com/p/57204184)

- [Javascript ：this关键字 详解](https://zhuanlan.zhihu.com/p/25349790)









