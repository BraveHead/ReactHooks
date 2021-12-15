// 手写一个 new

function New(fn) {
    let obj = {};  // 创建一个新对象
    if(!!fn.prototype) {
        obj.__proto__ = fn.prototype;  // 原型链关联
    };

    let result = fn.apply(obj, Array.prototype.slice.call(arguments, 1));

    if((typeof result === 'object' || typeof result === 'function') && result !== null) {
        return result;
    };

    return obj;
};

// example1
function createPerson(age) {
    this.name = 'zs';
    if(age) {
        this.age = age;
    }
};

let person1 = New(createPerson, 20);

console.log('person1:',person1, new createPerson(10));

