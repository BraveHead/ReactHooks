// js中的继承

// 第一种 原型示继承 这种大家都知道 代码就不写了。

// 第二种 借用构造函数。 主要是在子类型的构造函数中调用超类型的构造函数。 优点: 可以在子类型中往超类型中传入参数 缺点: 所有的属性和方法都在构造函数中无法复用，
// 而且超类型的原型上的方法也在子类型不可见。

// function SuperType() {
//     this.name = 'zhangsan';
//     this.sayName = function() {
//         console.log('name:', this.name);
//     };
// };

// function SubType() {
//     this.age = 10;
//     SuperType.call(this);
// };

// let person1 = new SubType();
// console.log('person1:',person1);

// person1.sayName();

// 第三种 组合继承 即原型链和借用构造函数用在一起。 优点: 集成两种优点的同时解决了两者的缺点。 缺点: 两次调用实例化超类方法, 会导致子类的原型中冗余超类中的非必要属性和方法。


// function SuperType(name, age) {
//     this.name = name;
//     this.age = age;
// };

// SuperType.prototype.sayName = function() {
//     console.log('name:', this.name);
// };

// function SubType(name, age) {
//     this.addr = 'hangzhou';
//     SuperType.call(this, name, age);
// };

// // 继承方法
// SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function() {
//     console.log('age:', this.age);
// };

// let person1 = new SubType('zhangsan', 20);
// console.log('person1:', person1);
// person1.sayName();
// person1.sayAge();


// 第四种是原型示继承 思路是基于已有的对象创建新的对象。有好几种写法如利用 new ,还可以利用 Object.create()

// example-1
// function create1(o) {
//     function F(){};
//     F.prototype = 0;
//     return new F();
// };

// example-2
// function create2(o) {
//     return Object.create(o, { name: '123' });
// }

// 第五种是寄生示继承。 主要思路是写一个方法,在方法内部对传入的对象进行功能的增强然后返回新的对象

// function create(o) {
//     let clone = Object(o);
//     clone.addr = 'hangzhou';
//     clone.sayName = function() {
//         console.log('name:', this.name);
//     };
//     return clone;
// }

// let test = {
//     name: 'zhangsan',
//     age: 20
// };

// let p1 = create(test);
// p1.sayName();

// 第四种 寄生示组合继承

function SuperType(name, age) {
    this.name = name;
    this.age = age;
};

SuperType.prototype.sayName = function() {
    console.log('name:', this.name);
};

function SubType(name, age) {
    this.addr = 'hangzhou';
    SuperType.call(this, name, age);
};

function inheritPrototype(subType, superType) {
    let prototype = Object(superType.prototype);
    debugger;
    // subType.constructor = subType;
    subType.prototype = prototype;
};

inheritPrototype(SubType, SuperType);

