// 工厂模式 工厂模式是软件工程中一种熟为人知的设计模式。这种模式抽离了创建对象的具体过程。但是无法解决实例对象和原型类型之间的关系

function createFactoryPerson(name, age) {
    let o = Object.create({});
    o.name = name;
    o.age = age;
    return o;
};

// let person1 =  createFactoryPerson('zhangsan', 10); // 通过执行函数

// console.log('person1:',person1);

// 构造函数 解决了工厂函数的缺点，但是每次new的时候都会去创建新的对象，导致一些相同功能的方法浪费内存。

function CreateConstructorPerson(name, age) {
    this.name = name;
    this.age = age;
    this.sayHello= function () {
        console.log('name:', this.name, this);
    }
    return this;
};

// let person2 =  new CreateConstructorPerson('zhangsan-2', 11); // 通过执行函数
// let say = person2.sayHello;

// person2.sayHello();
// say.call(person2);

// 原型模式 解决了构造函数的缺点，但是因为变量还有方法都挂载在原型上，当有变量的引用的时候会导致读写混乱。 基本不会单独使用这中模式

function Person() {
    
};
Person.prototype.name = 'zhangsan';
Person.prototype.age = 10;

Person.prototype.sayHello = function () {
    console.log('name:', this.name);
};

// 构造函数和原型的混合模式 优点: 集合构造函数和原型模式的优点  缺点: 封装性问题。

function CreateMixedPerson(name, age) {
    this.name = name;
    this.age = age;
    return this;
};

CreateMixedPerson.prototype = {
    constructor: CreateMixedPerson,
    sayHello: function() {
        console.log('name:', this.name);
    },
}

// let p1 = new CreateMixedPerson('zhangsan', 21);

// p1.sayHello();

// 动态原型模式  优点: 解决混成模式中的封装性问题   缺点: 无法给实例定义类型

function CreateDynamicPrototypePerson(name, age) {
    this.name = name;
    this.age = age;
    if(!CreateDynamicPrototypePerson.prototype.sayHello) {
        CreateDynamicPrototypePerson.prototype.sayHello = function() {
            console.log('name:', this.name);
        }
    };
    // return this;
};

let p1 = new CreateDynamicPrototypePerson('zhangsan', 100);
p1.sayHello();

let p2 = new CreateDynamicPrototypePerson('lisi', 99);
p2.sayHello();

// 寄生构造模式 这个不写了 代码和工厂模式是一样的，唯一的区别在于 创建的时候前面带个 new

// 稳妥构造函数模式  稳妥构造函数遵循和寄生构造函数类似的模式 但有两点不同: 一是新创建的对象的实例方法不引用this;二是不使用 new 操作符构造函数。




